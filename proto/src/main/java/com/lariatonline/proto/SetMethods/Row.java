package com.lariatonline.proto.SetMethods;

public class Row {
	private String name;
	private String chromosome1;
//	private String chromosome2;
	private String x1;
	private String x2;
	private String y1;
	private String y2;
	
	public Row(String name, String chromosome1, String x1, String x2, String y1, String y2) {
		this.name = name;
		this.chromosome1 = chromosome1;
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getChromosmoe1(){
		return chromosome1;
	}
	public void setChromosome1(String chromosome1){
		this.chromosome1 = chromosome1;
	}		
	
	public String getX1(){
		return x1;
	}
	public void setX1(String x1){
		this.x1 = x1;
	}	

	public String getX2(){
		return x2;
	}
	public void setX2(String x2){
		this.x2 = x2;
	}	
	
	public String getY1(){
		return y1;
	}
	public void setY1(String y1){
		this.y1 = y1;
	}	
	
	public String getY2(){
		return y2;
	}
	public void setY2(String y2){
		this.y2 = y2;
	}	
	
}