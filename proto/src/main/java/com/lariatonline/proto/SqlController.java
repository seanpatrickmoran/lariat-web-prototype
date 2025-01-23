package com.lariatonline.proto;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.*;
import java.sql.DriverManager;
import java.sql.SQLException;


@RestController
public class SqlController {
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
	
//	@GetMapping("/api/readuniq")
//	public String seekDistinct() {
//		String url0 = "jdbc:sqlite:/Users/seanmoran/Documents/Master/2024/Dec2024/databaseDUMP/database5.db";
//		String query0 = "SELECT * hic_path FROM imag";
//		
//		try {
//			Connection connection = DriverManager.getConnection(url0);
//			PreparedStatement statement = connection.prepareStatement(query0);		
////			Statement statement = connection.createStatement();
//			ResultSet response = statement.executeQuery();
//            while (response.next()) {
//                System.out.println("hic_path: " + response.getString("hic_path"));
//            }
//
//            response.close();
//            statement.close();
//            connection.close();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }		
//		
//		return "readHic";
//	}	

}
