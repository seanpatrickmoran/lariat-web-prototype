package com.lariatonline.proto.SetMethods;


import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class SetOperations {
	//what's the input
	
	public static Map<String,List<Row>> chromosomeRowToMap(List<Map<String, Object>> sqlList){
		
		Map<String,List<Row>> outMap = new HashMap<>();
		
		for(int i = 0; i<sqlList.size();i++) {
			// chrX,119515000,119520000,chrX,119770000,119775000
			String[] coordinatesPacked = ((String) sqlList.get(i).get("coordinates")).split(",");
			String chromosome = coordinatesPacked[0];
			String x1 = coordinatesPacked[1];
			String x2 = coordinatesPacked[2];
			String y1 = coordinatesPacked[4];
			String y2 = coordinatesPacked[5];
			
			if(!(outMap.containsKey(chromosome))) {
        		List<Row> chromsomeArrList = new ArrayList<>();
				outMap.put(chromosome, chromsomeArrList);
			}
			String name = (String) sqlList.get(i).get("name");
			Row entry = new Row(name, chromosome, x1, x2, y1, y2);
			outMap.get(chromosome).add(entry);

			
		}
	    return outMap;
	}
	
	
	public static List<String> intersectingIntervals(List<Row> list1, List<Row> list2){
		List<String> intersectingCoordinates = new ArrayList<>();
		
		int i = 0;
		int j = 0;
		
		while((i<list1.size())&&(j<list2.size())) {
			Row row1 = list1.get(i);
			String name1 = row1.getName();
			Integer x1Start = Integer.parseInt(row1.getX1());
			Integer x1End = Integer.parseInt(row1.getX2());
			Integer y1Start = Integer.parseInt(row1.getY1());
			Integer y1End = Integer.parseInt(row1.getY2());
			
			Row row2 = list2.get(j);
			String name2 = row2.getName();
			Integer x2Start = Integer.parseInt(row2.getX1());
			Integer x2End =  Integer.parseInt(row2.getX2());
			Integer y2Start = Integer.parseInt(row2.getY1());
			Integer y2End = Integer.parseInt(row2.getY2());	
			
			boolean xOverlaps = ((x1Start <= x2End)&&(x2Start <= x1End));
			boolean yOverlaps = ((y1Start <= y2End)&&(y2Start <= y1End));


			if(xOverlaps||yOverlaps) {
				intersectingCoordinates.add(name1 + ":" + name2);
			}
		
			if(x1End<x2End) {
				i++;
			}else {
				j++;
			}
		}
		
		return intersectingCoordinates;
	}
	
	
	public static List<String> filterNonIntersecting(List<Row> list1, List<Row> list2){
		List<String> nonIntersecting = new ArrayList<>();
		
		for(int i=0; i<list1.size(); i++) {
			Row row1 = list1.get(i);
			String name1 = row1.getName();
			Integer x1Start = Integer.parseInt(row1.getX1());
			Integer x1End = Integer.parseInt(row1.getX2());
			Integer y1Start = Integer.parseInt(row1.getY1());
			Integer y1End = Integer.parseInt(row1.getY2());
			
			boolean intersectsFlag = false;

			for(int j=0; i<list1.size(); j++) {
				Row row2 = list2.get(j);
				String name2 = row2.getName();
				Integer x2Start = Integer.parseInt(row2.getX1());
				Integer x2End =  Integer.parseInt(row2.getX2());
				Integer y2Start = Integer.parseInt(row2.getY1());
				Integer y2End = Integer.parseInt(row2.getY2());	
				
				boolean xOverlaps = ((x1Start <= x2End)&&(x2Start <= x1End));
				boolean yOverlaps = ((y1Start <= y2End)&&(y2Start <= y1End));
				
				if(xOverlaps||yOverlaps) {
					intersectsFlag = true;
					break;
				}
			}
			
			if(!intersectsFlag) {
				nonIntersecting.add(name1);
			}
		}

		return nonIntersecting;
	}	
	
	
	
	
	
	
	
	
	
	
	
	
}
