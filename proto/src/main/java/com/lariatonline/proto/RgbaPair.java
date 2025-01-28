package com.lariatonline.proto;

public class RgbaPair {
    private int[] rgbaRAW;
    private int[] rgbaProcessed;
	
	public RgbaPair(int[] rgbaProcessed, int[] rgbaRAW) {
	    this.rgbaRAW = rgbaRAW;
	    this.rgbaProcessed = rgbaProcessed;
	}

	public int[] getRgbaRAW(){
		return rgbaRAW;
	}
	public void setRgbaRAW(int[] rgbaRAW){
		this.rgbaRAW = rgbaRAW;
	}
	
	public int[] getRgbaProcessed(){
		return rgbaProcessed;
	}
	public void setRgbaProcessed(int[] rgbaProcessed){
		this.rgbaProcessed = rgbaProcessed;
	}
	
}
	