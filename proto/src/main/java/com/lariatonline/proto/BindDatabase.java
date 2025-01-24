package com.lariatonline.proto;
//import java.util.Collections;

import java.util.Map;
import java.util.List;

import java.sql.Connection;
import java.sql.SQLException;


import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.ResultSetHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.apache.commons.dbutils.DbUtils;

import com.google.gson.Gson; 


public class BindDatabase {
	public String BindPath() {
	//
	return "imported";
	}
	
	public static String resultSetToJson(Connection connection, String query) {
        List<Map<String, Object>> listOfMaps = null;
        try {
            QueryRunner queryRunner = new QueryRunner();
            listOfMaps = queryRunner.query(connection, query, new MapListHandler());
        } catch (SQLException se) {
            throw new RuntimeException("Couldn't query the database.", se);
        } finally {
            DbUtils.closeQuietly(connection);
        }
        return new Gson().toJson(listOfMaps);
    }
	
}
