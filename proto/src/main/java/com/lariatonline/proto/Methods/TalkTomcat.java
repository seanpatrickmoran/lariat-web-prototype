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
            return SystemName + " meows: Meow! ";
            
        }
        catch (Exception E) {
            System.err.println(E.getMessage());
            return Missed();
        }
		
        
    }
	
	public static String Missed() {
		return "    ＿_　　　　　　　/　　　　　　 ＼   {　　　　 ﾚ'　　　 　 }　　 　/:　:　　　　　|          \n"
				+ " ／二  ￣ﾆ=- 、　　 {　　　 .　:　:　:ー､　   ＿_」　  r'⌒ヽ|　　 　/:　:　:　.　  {          \n"
				+ ": : : : : : :.ヽ　 〉　　　　　　 /ヽ、　＼ﾍ ＼　7   　く二ｱﾌ　　 ／:　:　:　.r    |          \n"
				+ ": : : : : : : : ＼　　r､　 /´　　|ﾚ'　￣￣ヽフ{　 　  　〈{ 　 /:　:　:　.　{  　〈          \n"
				+ ": : : : : : : : : :ﾚ   ＼l　　　　　 　　 　} ヾ　r'´　 }ｦ　 /:　:　:　:　. ヽ　　＿＿       \n"
				+ ": : : : : : : : : :＼　/^ヽ＿_ ／ｌ ヽ　r' ﾉ　 ｀ｰｧ=ｰ'_/ 　／:　:　:　　_,､-＝ー'￣　  ｀＼   \n"
				+ ": : : : : : : : : : :V rﾍ　　　  {｀ｰ-rｰ'´ 　   /　ｧ――=' rへ:　: 　／　　　　　    　　  ｢ヽ \n"
				+ ": rへ　　　　　 : : : : : : : : : |    {       / r'^Ｘ:::}  i　 　/:　:              　| }\n"
				+ "_/　 >='ニ￣ﾆ=-､　　　　　　　 -､　,|  \\ \\      （_ｧｿ　{　　　 　    /:　:　:　 　　　  r'　レ'\n"
				+ "　／　　　　　 　ヽ　　 ｢ヽ_　  ノl_ノ   \\_)           〉ｒ‐　_＿  /:　:　:　:　 ヽ　 {　　 }  \n"
				+ "∨　　　　　　 　 　｀ー'　　 ￣｀　ｸ 　                ヽ＿_／ ＿_,ｽ:　:　:　:　 　}＿_ｲ　 /   \n"
				+ "､　　　　　　　　　　　　 　 　 　 }　　　                   　＼　　　　￣７:　:ｒ' ￣|　 {   \n"
				+ "　＼　　　　　　　 　　　　  }　  ﾉ　                          }　　　　 厂７　}　　 /　 |    \n"
				+ "　　 }　　　ｒ､ 　　  ,ィ   ト=-\"　　　　　                    ヽ｀　'´ ﾉ　/　/　　 /　 /    \n"
				+ "　　 {　　 〈　ﾄーr―-\"｛　　{　　　　　　　                      ｀ー ‐´ （_,ノ　  ｀ー'      \n"
				+ "　 　 ＼　 ＼＼_,)　　　＼　＼_　　　　　　　　　 　                 　　 〃                  \n"
				+ "　　　　 ＼＿ﾌ　　　　　　 ヽ＿ｿ                                                           \n"
				+ "";
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
