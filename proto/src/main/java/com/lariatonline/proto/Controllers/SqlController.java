package com.lariatonline.proto.Controllers;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.google.gson.Gson;
import com.lariatonline.proto.Methods.ByteArrToFloat32ArrayPair;
import com.lariatonline.proto.Methods.ImageMethods;
import com.lariatonline.proto.Methods.RgbaPair;
import com.lariatonline.proto.Methods.TalkTomcat;
import com.lariatonline.proto.SetMethods.SetOperations;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapListHandler;

import java.sql.*;


//import com.lariatonline.proto.BindDatabase;


@RestController
public class SqlController {
	
	private String databaseURI = "jdbc:sqlite:/Users/seanmoran/Documents/Master/2025/databse6_binary.db";
	
	Map<String,List<String>> tableMemory = new HashMap<>();
//	TalkTomcat binder = new TalkTomcat();

	
	@GetMapping("/api/talk")
	public ResponseEntity<String> TalkToHost() {
		
//        List<Map<String, String>> listOfMaps = null;
		String response = TalkTomcat.GetHost();
//		listOfMaps.get(0).put("response", response);
		return new ResponseEntity<String>(new Gson().toJson(response), HttpStatus.OK);
	}	
	
	@GetMapping("/api/test")
	public ResponseEntity<String> test() {
		
        Connection connection = null;
        List<Map<String, Object>> listOfMaps = null;
        
		String testQuery = "SELECT * FROM imag LIMIT 200 OFFSET 0";		
		
		try {
			MapListHandler beanListHandler = new MapListHandler();
			QueryRunner queryrunner = new QueryRunner();
			
			
			connection = DriverManager.getConnection(databaseURI);
			listOfMaps = queryrunner.query(connection, testQuery, beanListHandler);
			
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
            
        }		
		return new ResponseEntity<String>(new Gson().toJson(listOfMaps), HttpStatus.OK);
	}
	
	
	
	@GetMapping("/api/read_limiter")
	public ResponseEntity<String> read_limiter(
			@RequestParam("offset")int offset,
			@RequestParam("hic_path")String hic_path,
			@RequestParam("resolution")String resolution) {
		
        Connection connection = null;
        List<Map<String, Object>> listOfMaps = null;		
			
		String callQuery = "SELECT * FROM imag WHERE hic_path = (?) AND resolution = ? LIMIT 200 OFFSET ?";	
		
		try {
			MapListHandler beanListHandler = new MapListHandler();
			QueryRunner queryrunner = new QueryRunner();
			
			connection = DriverManager.getConnection(databaseURI);
			listOfMaps = queryrunner.query(connection, callQuery, beanListHandler, new Object[]{hic_path,resolution,offset});
			
		} catch (Exception e) {
			 e.printStackTrace();
		}
		
		return new ResponseEntity<String>(new Gson().toJson(listOfMaps), HttpStatus.OK);
	}	
	
	
	@GetMapping("/api/captureIntersect")
	public ResponseEntity<String> readDatasetAtResolution(
			@RequestParam("hic_path1")String hic_path1,
			@RequestParam("resolution1")String resolution1,
			@RequestParam("hic_path2")String hic_path2,
			@RequestParam("resolution2")String resolution2
			){	
		
		int guard = 2;
        Connection connection = null;
        List<Map<String, Object>> response1 = null;		
        List<Map<String, Object>> response2 = null;		
		String query1 = "SELECT * FROM imag WHERE hic_path = (?) AND resolution = (?)";	
		String query2 = "SELECT * FROM imag WHERE hic_path = (?) AND resolution = (?)";	

		
		try {
			MapListHandler beanListHandler = new MapListHandler();
			QueryRunner queryrunner = new QueryRunner();
			
			connection = DriverManager.getConnection(databaseURI);
			response1 = queryrunner.query(connection, query1, beanListHandler, new Object[]{hic_path1,resolution1});
			guard -= 1;
		} catch (Exception e) {
			 e.printStackTrace();
		}
		
		try {
			MapListHandler beanListHandler = new MapListHandler();
			QueryRunner queryrunner = new QueryRunner();
			
			connection = DriverManager.getConnection(databaseURI);
			response2 = queryrunner.query(connection, query2, beanListHandler, new Object[]{hic_path2,resolution2});
			guard -= 1;
		} catch (Exception e) {
			 e.printStackTrace();
		}
		
		if(guard!=0) {
			return new ResponseEntity<String>(new Gson().toJson(""), HttpStatus.EXPECTATION_FAILED);
		}
		
		List<String> result = SetOperations.intersectingRows(response1, response2);
		return new ResponseEntity<String>(new Gson().toJson(result), HttpStatus.OK);
	}	
	
	
	
	
	@GetMapping("/api/scanDB")
	public void walkDatabase() {	
		String query0 = "SELECT hic_path,resolution FROM imag";
		
		try {
			Connection connection = DriverManager.getConnection(databaseURI);
			Statement statement = connection.createStatement();
			ResultSet response = statement.executeQuery(query0);
			
			
            while (response.next()) {
            	String hicResponse = response.getString("hic_path");
            	String resolutionResponse = response.getString("resolution");
            	
            	if(!(tableMemory.containsKey(hicResponse))) {
            		List<String> resolutionMap = new ArrayList<>();
            		tableMemory.put(hicResponse, resolutionMap);
            	}

            	
            	if(!(tableMemory.get(hicResponse).contains(resolutionResponse))) {
            		System.out.println(tableMemory.get(hicResponse).contains(resolutionResponse));
            		tableMemory.get(hicResponse).add(resolutionResponse);
            		System.out.println(hicResponse + ", " + resolutionResponse + " ..." );
            	}
            }

            response.close();
            statement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }		

	}
	
	@GetMapping("/api/readTableMemory")
	public String readTableMemory() {
		if(tableMemory.isEmpty()) {
			walkDatabase();
		}
		
		Gson gson = new Gson(); 
//		System.out.println(gson.toJson(tableMemory));
		return gson.toJson(tableMemory); 
	}	
	
	@GetMapping("/api/getImageSingleton")
	public ResponseEntity<String> read_limiter(@RequestParam("name")String name) {
        Connection connection = null;
        List<Map<String, Object>> listOfMaps = null;
		String callQuery = "SELECT dataset,name,coordinates, numpyarr, resolution, dimensions, viewing_vmax FROM imag WHERE name = ?";	
		
		try {
			MapListHandler beanListHandler = new MapListHandler();
			QueryRunner queryrunner = new QueryRunner();
			
			connection = DriverManager.getConnection(databaseURI);
			listOfMaps = queryrunner.query(connection, callQuery, beanListHandler, name);
			
		} catch (Exception e) {
			 e.printStackTrace();
		}
		
		
        double vMax = (double) listOfMaps.get(0).get("viewing_vmax");
        int dimension = (int) listOfMaps.get(0).get("dimensions");
        int scaleFactor = (int) Math.ceil(450.0/dimension);
		byte[] bytes = (byte[])listOfMaps.get(0).get("numpyarr");

		
	    ByteArrToFloat32ArrayPair flatArrays = ImageMethods.byteArrToFloat32Array(bytes, dimension);
	    float[] flatFloat32Arr = flatArrays.getFloatArr();
	    Float trueMax = flatArrays.getTrueMax();
	    
	
        int[] histogram = new int[dimension*dimension];    
        for (int i=0; i < flatFloat32Arr.length;i++) {
        	int normalValue = (int) Math.round(flatFloat32Arr[i]/trueMax*255);
        	histogram[i] = normalValue;
        }       
        listOfMaps.get(0).put("histogram", histogram);
        

        
        float[][] resizedArray = ImageMethods.kroneckerExpansion(flatFloat32Arr, dimension, scaleFactor);

        float[] flatarray = new float[dimension*dimension*scaleFactor*scaleFactor];
        int index = 0;
        for (float[] row : resizedArray) {
          for (float element : row) {
        	  flatarray[index] = (float) element;
        	  index++;
          }
        }
        
        RgbaPair rgbaRawAndProc = ImageMethods.rgbaRawAndProcArrayPair(flatarray, dimension, scaleFactor, vMax);
        int[] rgbaArray = rgbaRawAndProc.getRgbaProcessed();
		int[] rgbaRawArray = rgbaRawAndProc.getRgbaRAW();     
		
        listOfMaps.get(0).put("rgbaArray", rgbaArray);
        listOfMaps.get(0).put("rgbaRawArray", rgbaRawArray);


   		return new ResponseEntity<String>(new Gson().toJson(listOfMaps), HttpStatus.OK);
	}	
}
