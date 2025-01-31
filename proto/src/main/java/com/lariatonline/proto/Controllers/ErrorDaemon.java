package com.lariatonline.proto.Controllers;


import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class ErrorDaemon implements ErrorController {

	@GetMapping("/error")
    public String handleError(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        String statusCode = status.toString();
        return switch(statusCode) {
        case "404"  -> "404.html";
        case "500"  -> "500.html";
        case "403"  -> "403.html";
        default -> "400.html";
        };

    }
   
}