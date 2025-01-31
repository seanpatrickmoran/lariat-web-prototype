package com.lariatonline.proto.Methods;

public class ByteArrToFloat32ArrayPair {
    private float[] floatArr;
    private Float trueMax;
	
	public ByteArrToFloat32ArrayPair(float[] flatFloat32Array, Float trueMax) {
	    this.floatArr = flatFloat32Array;
	    this.trueMax = trueMax;
	}

	public float[] getFloatArr(){
		return floatArr;
	}
	public void setFloatArr(float[] floatArr){
		this.floatArr = floatArr;
	}
	
	public Float getTrueMax(){
		return trueMax;
	}
	public void setTrueMax(Float trueMax){
		this.trueMax = trueMax;
	}
	
}
	


