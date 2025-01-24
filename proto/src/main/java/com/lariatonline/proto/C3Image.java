package com.lariatonline.proto;

public class C3Image{

	private String name;
	private String dataset;
	private String coordinates;
	private String numpyarr;
	private Integer viewing_vmax;
	private Integer dimensions;
	private Integer resolution;
	private String	hic_path;
	private String	pub_id;
	private String	norm;
	private String	meta;
	
	public C3Image(String name, String dataset, String coordinates, String numpyarr) {
		this.name = name;
		this.dataset = dataset;
		this.coordinates = coordinates;
		this.numpyarr = numpyarr;
	}

	public String getName(){
		return name;
	}
	public void setName(String name){
		this.name = name;
	}

	public String getDataset(){
		return dataset;
	}  
	public void setDataset(String dataset){
		this.dataset = dataset;
	}

	public String getCoordinates(){
		return coordinates;
	}  
	public void setCoordinates(String coordinates){
		this.coordinates = coordinates;
	}

	public String getNumpyarr(){
		return numpyarr;
	}
	public void setNumpyarr(String numpyarr){
		this.numpyarr = numpyarr;
	}	

	public Integer getViewing_vmax(){
		return viewing_vmax;
	}
	public void setViewing_vmax(Integer viewing_vmax){
		this.viewing_vmax = viewing_vmax;
	}	

	public Integer getDimensions(){
		return dimensions;
	}
	public void setDimensions(Integer dimensions){
		this.dimensions = dimensions;
	}	
	
	public Integer getResolution(){
		return resolution;
	}
	public void setResolution(Integer resolution){
		this.resolution = resolution;
	}	

	public String getHic_path(){
		return hic_path;
	}
	public void setHic_pat(String hic_path){
		this.hic_path = hic_path;
	}

	public String getPub_id(){
		return pub_id;
	}
	public void setPub_id(String pub_id){
		this.pub_id = pub_id;
	}

	public String getNorm(){
		return norm;
	}
	public void setNorm(String norm){
		this.norm = norm;
	}

	public String getMeta(){
		return meta;
	}
	public void setMeta(String meta){
		this.meta = meta;
	}

	
	@Override
	public String toString() {
		return name;
	}
	
}
