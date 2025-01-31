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

//import org.apache.commons.codec.binary.Base64;
import org.apache.commons.dbutils.QueryRunner;
//import org.apache.commons.dbutils.ResultSetHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;

//import java.
//import java.io.*;
import java.sql.*;


//import com.lariatonline.proto.BindDatabase;


@RestController
public class SqlController {
	
	private String databaseURI = "jdbc:sqlite:/Users/seanmoran/Documents/Master/2025/databse6_binary.db";
	
	Map<String,List<String>> tableMemory = new HashMap<>();
	TalkTomcat binder = new TalkTomcat();
	

	
	@GetMapping("/api/talk")
	public String TalkToHost() {
		return TalkTomcat.GetHost();
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
	
	
	
	@GetMapping("/api/scanDB")
	public void walkDatabase() {	
		String query0 = "SELECT hic_path,resolution FROM imag";
		
		try {
			Connection connection = DriverManager.getConnection(databaseURI);
			Statement statement = connection.createStatement();
			ResultSet response = statement.executeQuery(query0);
			
//			int ticker = 0;
			
            while (response.next()) {
//            	System.out.println(ticker++);
            	String hicResponse = response.getString("hic_path");
            	String resolutionResponse = response.getString("resolution");
            	
            	if(!(tableMemory.containsKey(hicResponse))) {
            		List<String> resolutionMap = new ArrayList<>();
            		tableMemory.put(hicResponse, resolutionMap);
//                	System.out.println(hicResponse);

            	}

            	
            	if(!(tableMemory.get(hicResponse).contains(resolutionResponse))) {
            		System.out.println(tableMemory.get(hicResponse).contains(resolutionResponse));
            		tableMemory.get(hicResponse).add(resolutionResponse);
//                	System.out.println(hicResponse + ", " + resolutionResponse);
//                	System.out.println(tableMemory.get(hicResponse));
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
		String callQuery = "SELECT dataset,name,coordinates, numpyarr, dimensions, viewing_vmax FROM imag WHERE name = ?";	
		
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
