package com.lariatonline.proto.Methods;
//import java.util.Collections;

//import java.util.Map;
//import java.util.List;
//
//import java.sql.Connection;
//import java.sql.SQLException;
//
//
//import org.apache.commons.dbutils.QueryRunner;
//import org.apache.commons.dbutils.ResultSetHandler;
//import org.apache.commons.dbutils.handlers.MapListHandler;
//import org.apache.commons.dbutils.DbUtils;
//
//import com.google.gson.Gson; 
import java.net.InetAddress;

public class TalkTomcat {
	public static String GetHost() {
		String SystemName = null;
		
		try {
            SystemName = InetAddress.getLocalHost().getHostName();
 
            // SystemName stores the name of the system
            System.out.println("System Name : "
                               + SystemName);
        }
        catch (Exception E) {
            System.err.println(E.getMessage());
        }
		
        return SystemName + " meows: Meow! ";
    }
	
	public static String Missed() {
		return """	
　　　＿_　　　　　　　 /　　　　　　 　 ＼　 {　　　　 　 ﾚ'　　　　　}　　　　　 /:　:　　　　　　 |
／二　　 ￣ﾆ=-、　　{　　　 　 　 .　:　:　:ー､　　　＿_」　　r'⌒ヽ|　　　 　 /:　:　:　:　.　　　 {
:　:　:　:　:　:　:　: .ヽ　 〉　　　　　　　　/ヽ、　＼ﾍ＼　7 　 く二ｱﾌ　　　 ／:　:　:　.　r　　 　 |
:　:　:　:　:　:　:　:　:　＼　r､　　/´　　 |ﾚ'　￣￣ヽフ{　　 　 　 〈｛ 　 　 /:　:　:　:　.　{:　　　 〈
:　:　:　:　:　:　:　:　:　:　:ﾚ　 ＼l　　　　 　 　 　 　 }　ヾ　 r'´　　}ｦ　　 /:　:　:　:　　　 ヽ　　　 ＿＿
:　:　:　:　:　:　:　:　:　:　: ＼　 /^ヽ＿_／ｌ ヽ　 r' ﾉ　　｀ｰｧ=ｰ'_/ 　 ／:　:　:　　　 _,､-＝ー'￣　　　｀＼
:　:　:　:　:　:　:　:　:　:　:　:　V rﾍ　　　　{｀ｰ-rｰ'´ 　 　 / 　 ｧ―=' rへ:　:　:　 ／　　　　　　　　　　　　｢ヽ
:　rへ　　　　　　 　 　 :　:　:　:　:　:　:　: |　　{ 　 　 　 /　 r'^Ｘ: : : :}　　i　　　/:　:　　　　　　　　　　 　 |　}
_/　　>=' ニ￣ ﾆ=-､　　　　　　　-､　　,|　∧,,∧　　（_ｧ_,ｿ　{　　　 　 　 　 /:　:　:　:　　　 　 　 　 r'　 レ'
　 ／　　　　　 　 　 ヽ　　｢ヽ_ヽ　 ノ^l_ノ (･ω･｀；)っ∧,,∧　〉　ｒ‐　 _＿　/:　:　:　:　:　　ヽ　 　 　 {　　 }
∨　　　　　　 　 　 　 ｀ー'　　 ￣｀　ｸ 　 (_っ 　 ﾉ　(；´･ω) ヽ＿_／ ＿_,ｽ:　:　:　:　:　.　　}　 ＿_ｲ　 /
､　　　　　　　　　　　　 　 　 　 　 　 }　　　 ∧,,∧　 (っ　　 ∧,,∧　　＼　　　　￣７:　:　　ｒ' ￣　 |　 {
　＼　　　　　　　　　　　　　　}　 　 ﾉ　(（ c(ω･´；) ∧,,∧ ( ；ω； )　　 }　　　　　 厂７　　}　　　/ 　 |
　　 }　　　ｒ､　　　　　　,ィ　　ト=-"　　　　　〉　　ぅ (・ω･#) っ　ｃ∧,,∧ヽ｀　 '´　ﾉ　/　　/　　 /　　/
　　 {　　 〈　ﾄーr―-"　｛　　{　　　　　　　〈_,ー､c=c- 　 c) ｕ-ｕ(； ・ω) ｀ー ‐´　 （_,　ノ　　　｀ー'
　 　 ＼　 ＼＼_,)　　　　＼　＼_　　　　　　　　　 　 ｕｰｧ_ﾉ　　　ﾉ っ゛,っ゛　　 〃
　　　　 ＼＿ﾌ　　　　　　　 ヽ＿ｿ
""";
	}
	
//	public static String resultSetToJson(Connection connection, String query) {
//        List<Map<String, Object>> listOfMaps = null;
//        try {
//            QueryRunner queryRunner = new QueryRunner();
//            listOfMaps = queryRunner.query(connection, query, new MapListHandler());
//        } catch (SQLException se) {
//            throw new RuntimeException("Couldn't query the database.", se);
//        } finally {
//            DbUtils.closeQuietly(connection);
//        }
//        return new Gson().toJson(listOfMaps);
//    }
	


}
