package com.lariatonline.proto;

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
	BindDatabase binder = new BindDatabase();
	
	
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
//			listOfMaps = queryrunner.query(connection, callQuery, beanListHandler, offset);
//			System.out.println(offset + ", " + hic_path + ", " + resolution);
			listOfMaps = queryrunner.query(connection, callQuery, beanListHandler, new Object[]{hic_path,resolution,offset});
			
		} catch (Exception e) {
			 e.printStackTrace();
		}
		
//		System.out.println(readTableMemory());		
		return new ResponseEntity<String>(new Gson().toJson(listOfMaps), HttpStatus.OK);
	}	
	
	
	
	@GetMapping("/api/scanDB")
	public void walkDatabase() {	
		//with a static DB, it isn't necessary to do this.
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
            		tableMemory.get(hicResponse).add(resolutionResponse);
//            		System.out.println(hicResponse + ", " + resolutionResponse + " ..." );
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
		String callQuery = "SELECT name, dataset, coordinates, numpyarr, dimensions, viewing_vmax FROM imag WHERE name = ?";	
		
		try {
			MapListHandler beanListHandler = new MapListHandler();
			QueryRunner queryrunner = new QueryRunner();
			
			connection = DriverManager.getConnection(databaseURI);
//			System.out.println(name);
			listOfMaps = queryrunner.query(connection, callQuery, beanListHandler, name);
			
		} catch (Exception e) {
			 e.printStackTrace();
		}
		
        double vMax = (double) listOfMaps.get(0).get("viewing_vmax");
        int dimension = (int) listOfMaps.get(0).get("dimensions");
        int scaleFactor = (int) Math.ceil(450.0/dimension);
		byte[] bytes = (byte[])listOfMaps.get(0).get("numpyarr");

		
		float trueMax = -1.0f;
	    float[] floatArray = new float[dimension*dimension];    


	    for (int i = 0; i < bytes.length; i+=4) {
        	int floatBytes;
        	floatBytes = 
        			((bytes[i]   & 0xFF) << 0 )|
        			((bytes[i+1] & 0xFF) << 8 )|
        			((bytes[i+2] & 0xFF) << 16)|
        			((bytes[i+3] & 0xFF) << 24);
            
        	float asFloat = Float.intBitsToFloat(floatBytes);
        	if(trueMax<asFloat) {
        		trueMax = asFloat;
        	}
        	floatArray[i/4] = asFloat;		
        }
	
        int[] histogram = new int[256];
        for (int i=0; i < floatArray.length;i++) {
        	int normalValue = (int) Math.round(floatArray[i]/trueMax*255);
        	histogram[normalValue] += 1;     // Red
        }    
        listOfMaps.get(0).put("histogram", histogram);
        
        
        
        float[][] resizedArray = new float[dimension*scaleFactor][dimension*scaleFactor];
//        
        for(int i = 0; i < dimension;i++) {
        	for (int j = 0; j < dimension; j++) {
        		float value = floatArray[i+j*dimension];
        		for(int di = 0; di < scaleFactor; di++) {
        			for(int dj = 0; dj < scaleFactor; dj++) {
        				resizedArray[j*scaleFactor+dj][i*scaleFactor+di] = value;
        			}
        		}
        	}
        }

        
        float[] flatarray = new float[dimension*dimension*scaleFactor*scaleFactor];
        int index = 0;
        for (float[] row : resizedArray) {
          for (float element : row) {
        	  flatarray[index] = (float) element;
        	  index++;
          }
        }

        int[] rgbaArray = new int[dimension*dimension*scaleFactor*scaleFactor*4];
        int[] rgbaRawArray = new int[dimension*dimension*scaleFactor*scaleFactor*4];

        for (int i = 0; i < dimension*dimension*scaleFactor*scaleFactor; i++) {
        	int normalValue = (int) Math.round(flatarray[i]/vMax*255);
        	rgbaArray[i * 4] = normalValue;     // Red
        	rgbaArray[i * 4 + 1] = normalValue; // Green
        	rgbaArray[i * 4 + 2] = normalValue; // Blue
        	rgbaArray[i * 4 + 3] = 255;   		// Alpha
        	// for later.
        	rgbaRawArray[i * 4] = (int) flatarray[i];
        	rgbaRawArray[i * 4 + 1] = (int) flatarray[i];
        	rgbaRawArray[i * 4 + 2] = (int) flatarray[i];
        	rgbaRawArray[i * 4 + 3] = (int) 0;

        }    
        listOfMaps.get(0).put("rgbaArray", rgbaArray);
        listOfMaps.get(0).put("rgbaRawArray", rgbaRawArray);


   		return new ResponseEntity<String>(new Gson().toJson(listOfMaps), HttpStatus.OK);
	}	
}
