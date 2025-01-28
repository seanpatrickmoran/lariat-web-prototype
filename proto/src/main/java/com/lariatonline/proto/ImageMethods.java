package com.lariatonline.proto;

//import com.lariatonline.proto.ByteArrToFloat32ArrayPair;
//import com.lariatonline.proto.RgbaPair;

public class ImageMethods {
	public static ByteArrToFloat32ArrayPair byteArrToFloat32Array(byte[] bytes, int dimension){
		
		float trueMax = -1.0f;
		float[] flatFloat32Array = new float[dimension*dimension];  
		
		
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
        	flatFloat32Array[i/4] = asFloat;		
        }		
		
		ByteArrToFloat32ArrayPair pair = new ByteArrToFloat32ArrayPair(flatFloat32Array, trueMax);
	    return pair;
	}
	
	
	public static RgbaPair rgbaRawAndProcArrayPair(float[] flatarray, int dimension, int scaleFactor, double vMax){
		
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
	    
	    RgbaPair twoRGBA = new RgbaPair(rgbaArray, rgbaRawArray);
	    return twoRGBA;
		

	}
	
	
	public static float[][] kroneckerExpansion(float[] flatf32Arr, int dimension, int scaleFactor){
		
        float[][] resizedArray = new float[dimension*scaleFactor][dimension*scaleFactor];
        for(int i = 0; i < dimension;i++) {
        	for (int j = 0; j < dimension; j++) {
        		float value = flatf32Arr[i+j*dimension];
        		for(int di = 0; di < scaleFactor; di++) {
        			for(int dj = 0; dj < scaleFactor; dj++) {
        				resizedArray[j*scaleFactor+dj][i*scaleFactor+di] = value;
        			}
        		}
        	}
        }
	    
        return resizedArray;
	}
	
}
