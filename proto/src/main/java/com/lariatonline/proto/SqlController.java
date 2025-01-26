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
import org.apache.commons.dbutils.ResultSetHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;

import java.util.Base64;
import java.nio.ByteBuffer;
import java.nio.FloatBuffer;

//import java.sql.SQLException;
import java.sql.*;

//import com.lariatonline.proto.BindDatabase;


@RestController
public class SqlController {
	
	Map<String,List<String>> tableMemory = new HashMap<>();
	BindDatabase binder = new BindDatabase();
	
	
	@GetMapping("/api/test")
	public ResponseEntity<String> test() {
		
        Connection connection = null;
        List<Map<String, Object>> listOfMaps = null;
        
		String databaseURI = "jdbc:sqlite:/Users/seanmoran/Documents/Master/2025/Jan2025/012125_java2sqlite3/database5.db";
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
			
		String databaseURI = "jdbc:sqlite:/Users/seanmoran/Documents/Master/2025/Jan2025/012125_java2sqlite3/database5.db";
		String callQuery = "SELECT * FROM imag WHERE hic_path = (?) AND resolution = ? LIMIT 200 OFFSET ?";	
		
		try {
			MapListHandler beanListHandler = new MapListHandler();
			QueryRunner queryrunner = new QueryRunner();
			
			connection = DriverManager.getConnection(databaseURI);
//			listOfMaps = queryrunner.query(connection, callQuery, beanListHandler, offset);
			System.out.println(offset + ", " + hic_path + ", " + resolution);
			listOfMaps = queryrunner.query(connection, callQuery, beanListHandler, new Object[]{hic_path,resolution,offset});
			
		} catch (Exception e) {
			 e.printStackTrace();
		}
		
		System.out.println(readTableMemory());		
		return new ResponseEntity<String>(new Gson().toJson(listOfMaps), HttpStatus.OK);
	}	
	
	
	
	@GetMapping("/api/scanDB")
	public void walkDatabase() {	
//	public ResponseEntity<String> walkDatabase() {
		String url0 = "jdbc:sqlite:/Users/seanmoran/Documents/Master/2025/Jan2025/012125_java2sqlite3/database5.db";
		String query0 = "SELECT hic_path,resolution FROM imag";
		
		
		try {
			Connection connection = DriverManager.getConnection(url0);
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
		System.out.println(gson.toJson(tableMemory));
		return gson.toJson(tableMemory); 
	}	
	
	@GetMapping("/api/getImageSingleton")
	public ResponseEntity<String> read_limiter(@RequestParam("name")String name) {
        Connection connection = null;
        List<Map<String, Object>> listOfMaps = null;		
			
		String databaseURI = "jdbc:sqlite:/Users/seanmoran/Documents/Master/2025/Jan2025/012125_java2sqlite3/database5.db";
		String callQuery = "SELECT numpyarr, dimensions, viewing_vmax FROM imag WHERE name = ?";	
		
		try {
			MapListHandler beanListHandler = new MapListHandler();
			QueryRunner queryrunner = new QueryRunner();
			
			connection = DriverManager.getConnection(databaseURI);
			System.out.println(name);
			listOfMaps = queryrunner.query(connection, callQuery, beanListHandler, name);
			
		} catch (Exception e) {
			 e.printStackTrace();
		}
		
		
		// Java is very fast compared to JS but we hope to use the Min/Max clientside to handle rethresholding.
		// So we can't use just the kronecker and renormalization here... we can only unwrap the encodings....
		// maybe you just do the kronecker anyway?
		// pass normalized map AND raw map, only use raw map after rethreholding prerender norm map from here.
		
		
		// this was float32 arr -> base64 binary -> string :(
		
		String stringbase64 = (String) listOfMaps.get(0).get("numpyarr");
		System.out.println(stringbase64);
		byte[] bytes = Base64.getDecoder().decode(stringbase64);
		
        FloatBuffer floatBuffer = ByteBuffer.wrap(bytes).asFloatBuffer();
        float[] floatArray = new float[floatBuffer.remaining()];
        floatBuffer.get(floatArray);
//        for (float f : floatArray) {
//            System.out.println(f);
//        }
        
        int limit = (int) listOfMaps.get(0).get("dimensions");
//        System.out.println(listOfMaps.get(0).get("viewing_vmax"));

        
        // this solves the bug with vmax solved being weird...
        float vMaxSolved = 1e-38f;
        int x = 0;
        for (int i = 0; i < limit; i++) {
        	for (int j = 0; j < limit; j++) {
//          	int normalValue = ((int) (floatArray[x]/vMax))*255;
        		if(floatArray[x]>vMaxSolved) {
        			vMaxSolved = floatArray[x];
        		}
        			x++;
        	}
        }//        
        
        
        int dimension = (int) listOfMaps.get(0).get("dimensions");
        int scaleFactor = (int) Math.ceil(450.0/dimension);
        float[][] resizedArray = new float[dimension*scaleFactor][dimension*scaleFactor];
        
        for(int i = 0; i < dimension;i++) {
        	for (int j = 0; j < dimension; j++) {
        		float value = floatArray[i+j*dimension];
        		for(int di = 0; di < scaleFactor; di++) {
        			for(int dj = 0; dj < scaleFactor; dj++) {
        				resizedArray[i*scaleFactor+di][j*scaleFactor+dj] = value;
        			}
        		}
        	}
        }
        
//        System.out.println(dimension);
//        System.out.println(450.0/dimension);
//        System.out.println(scaleFactor);
//        System.out.println(dimension*scaleFactor);
        
        float[] flatarray = new float[dimension*dimension*scaleFactor*scaleFactor];
        int index = 0;
        for (float[] row : resizedArray) {
          for (float element : row) {
        	  flatarray[index] = (float) element;
        	  index++;
          }
        }
        
        //pre normalized flat RGBA array.
        int[] rgbaArray = new int[limit*limit*scaleFactor*scaleFactor*4];
        for (int i = 0; i < dimension*dimension*scaleFactor*scaleFactor; i++) {
        	int normalValue = (int) Math.round(flatarray[i]/vMaxSolved*255);
        	rgbaArray[i * 4] = normalValue;     // Red
        	rgbaArray[i * 4 + 1] = normalValue; // Green
        	rgbaArray[i * 4 + 2] = normalValue; // Blue
        	rgbaArray[i * 4 + 3] = 255;   // Alpha
        }    
        
        listOfMaps.get(0).put("rgbaArray", rgbaArray);
        
        
        //the values are still really messed up.
		return new ResponseEntity<String>(new Gson().toJson(listOfMaps), HttpStatus.OK);
	}	
}
