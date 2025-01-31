package com.lariatonline.proto.Controllers;
//
////import java.util.Map;
////import java.util.HashMap;
////import java.util.List;
////import java.util.ArrayList;
//
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
////import org.springframework.web.bind.annotation.Controller;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.boot.web.servlet.error.ErrorController;
//import org.springframework.http.HttpStatus;
//
//import com.google.gson.Gson; 
////import org.apache.commons.codec.binary.Base64;
//import org.apache.commons.dbutils.QueryRunner;
////import org.apache.commons.dbutils.ResultSetHandler;
//import org.apache.commons.dbutils.handlers.MapListHandler;
//
////import java.
////import java.io.*;
//import java.sql.*;
//
//
//
//
//@Controller
//public class ErrorDaemon implements ErrorController  {
//    @RequestMapping("/error")
//    public String handleError() {
//        System.out.println("error");
//        return "error";
//    }
//}


import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;

//@RestController
@Controller
public class ErrorDaemon implements ErrorController {

	@GetMapping("/error")
    public String handleError(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        System.out.println(status);
        return "500.html";
//        return "a";

    }
   
}