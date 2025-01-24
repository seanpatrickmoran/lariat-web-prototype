package com.lariatonline.proto;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.*;
import java.sql.DriverManager;
//import java.sql.SQLException;


@RestController
public class SqlController {
	
	Map<String,List<String>> tableMemory = new HashMap<>();
	
	
	@GetMapping("/api/test")
	public String test() {
		String url0 = "jdbc:sqlite:/Users/seanmoran/Documents/Master/2025/Jan2025/012125_java2sqlite3/database5.db";
		String query0 = "SELECT * FROM imag LIMIT 200 OFFSET 0";		
		
		try {
			Connection connection = DriverManager.getConnection(url0);
			Statement statement = connection.createStatement();
			ResultSet response = statement.executeQuery(query0);
			
            while (response.next()) {
                System.out.println("Name: " + response.getString("name") +
                                   ", Coordinates: " + response.getString("coordinates"));
            }

            response.close();
            statement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
            
        }		
		
		return "test test, anybody home?";
	}
	
	/**
	 * @param offset
	 * @return
	 */
	@GetMapping("/api/read_limiter")
	public String read_limiter(@RequestParam("offset")int offset) {
		String url0 = "jdbc:sqlite:/Users/seanmoran/Documents/Master/2025/Jan2025/012125_java2sqlite3/database5.db";
		String query0 = "SELECT * FROM imag LIMIT 200 OFFSET ?";	
		
		try {
			Connection connection = DriverManager.getConnection(url0);
			PreparedStatement statement = connection.prepareStatement(query0);
			statement.setInt(1, offset);
			
			ResultSet response = statement.executeQuery();
            while (response.next()) {
                System.out.println("Name: " + response.getString("name") +
                                   ", Coordinates: " + response.getString("coordinates"));
            }

            response.close();
            statement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
            
        }		
		
		return "readlimited";
	}
	

	/***
	 * 
	 * DISTINCT keyword fails, find something else.
	 * 
	 */
	
	@GetMapping("/api/scanDB")
	public String walkDatabase() {
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
		
		
		return "readHic";
	}	

}
