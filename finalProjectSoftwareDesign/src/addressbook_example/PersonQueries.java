// Mohamed Khelif
// Fig. 28.31: PersonQueries.java
// PreparedStatements used by the Address Book application
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.ArrayList;

public class PersonQueries
{
   private static final String URL = "jdbc:derby:addressbook";
   private static final String USERNAME = "deitel";
   private static final String PASSWORD = "deitel";

   private Connection connection; // manages connection
   private PreparedStatement selectAllPeople; 
   private PreparedStatement selectPeopleByLastName; 
   private PreparedStatement insertNewPerson;

   private PreparedStatement updateCurrentPerson;
   private PreparedStatement deleteCurrentPerson;
   private PreparedStatement selectPeopleByState;
    
   // constructor
   public PersonQueries() throws SQLException
   {
      try 
      {
         connection = 
            DriverManager.getConnection(URL, USERNAME, PASSWORD);


         // create query that selects all entries in the AddressBook
         selectAllPeople = 
            connection.prepareStatement("SELECT * FROM Addresses");
         
         // create query that selects entries with a specific last name
         selectPeopleByLastName = connection.prepareStatement(
            "SELECT * FROM Addresses WHERE UPPER(LastName) = UPPER(?)");
         
         // create insert that adds a new entry into the database
         insertNewPerson = connection.prepareStatement(
            "INSERT INTO Addresses " + 
            "(FirstName, LastName, Email, PhoneNumber,State) " +
            "VALUES (?, ?, ?, ?, ?)");

         // create update that updates current entry with specific id
         updateCurrentPerson = connection.prepareStatement(
                 "UPDATE Addresses SET " +
                         "FirstName = ?, LastName = ?, Email = ?, PhoneNumber = ? ,State = ?" +
                         "WHERE AddressID = ? "
         );


         // create delete that selects current entry with specific id and deletes it
         deleteCurrentPerson = connection.prepareStatement(
                 "DELETE FROM Addresses WHERE AddressID = ?"
         );

         selectPeopleByState = connection.prepareStatement(
                 "SELECT * FROM Addresses WHERE UPPER(State) = UPPER(?)"
         );
      }
      catch (SQLException sqlException)
      {
          throw new SQLException(sqlException);
//         sqlException.printStackTrace();
//         System.exit(1);
      }
   } // end PersonQueries constructor
   
   // select all of the addresses in the database
   public List< Person > getAllPeople()
   {
      List< Person > results = null;
      ResultSet resultSet = null;
      
      try 
      {
         // executeQuery returns ResultSet containing matching entries
         resultSet = selectAllPeople.executeQuery(); 
         results = new ArrayList< Person >();
         
         while (resultSet.next())
         {
            results.add(new Person(
               resultSet.getInt("addressID"),
               resultSet.getString("firstName"),
               resultSet.getString("lastName"),
               resultSet.getString("email"),
               resultSet.getString("phoneNumber"),
               resultSet.getString("state")));

         } 
      } 
      catch (SQLException sqlException)
      {
         System.out.println("exception");
         sqlException.printStackTrace();         
      } 
      finally
      {
         try 
         {
            resultSet.close();
         } 
         catch (SQLException sqlException)
         {
            sqlException.printStackTrace();         
            close();
         }
      }
      
      return results;
   } 

   // select person by last name   
   public List< Person > getPeopleByLastName(String name)
   {
      List< Person > results = null;
      ResultSet resultSet = null;

      try 
      {
         selectPeopleByLastName.setString(1, name); // specify last name

         // executeQuery returns ResultSet containing matching entries
         resultSet = selectPeopleByLastName.executeQuery(); 

         results = new ArrayList< Person >();

         while (resultSet.next())
         {
            results.add(new Person(resultSet.getInt("addressID"),
               resultSet.getString("firstName"),
               resultSet.getString("lastName"),
               resultSet.getString("email"),
               resultSet.getString("phoneNumber"),
               resultSet.getString("state")));
         } 
      } 
      catch (SQLException sqlException)
      {
         sqlException.printStackTrace();
      } 
      finally
      {
         try 
         {
            resultSet.close();
         }
         catch (SQLException sqlException)
         {
            sqlException.printStackTrace();         
            close();
         }
      } 
      
      return results;
   } 


   public List< Person > getPeopleByState(String state){
       List< Person > results = null;
       ResultSet resultSet = null;

       try
       {
           selectPeopleByState.setString(1, state); // specify last name

           // executeQuery returns ResultSet containing matching entries
           resultSet = selectPeopleByState.executeQuery();

           results = new ArrayList< Person >();

           while (resultSet.next())
           {
               results.add(new Person(resultSet.getInt("addressID"),
                       resultSet.getString("firstName"),
                       resultSet.getString("lastName"),
                       resultSet.getString("email"),
                       resultSet.getString("phoneNumber"),
                       resultSet.getString("state")));
           }
       }
       catch (SQLException sqlException)
       {
           sqlException.printStackTrace();
       }
       finally
       {
           try
           {
               resultSet.close();
           }
           catch (SQLException sqlException)
           {
               sqlException.printStackTrace();
               close();
           }
       }

       return results;
   }
   // add an entry
   public int addPerson(
      String fname, String lname, String email, String num, String state)
   {
      int result = 0;
      
      // set parameters, then execute insertNewPerson
      try 
      {
         insertNewPerson.setString(1, fname);
         insertNewPerson.setString(2, lname);
         insertNewPerson.setString(3, email);
         insertNewPerson.setString(4, num);
         insertNewPerson.setString(5,state);

         // insert the new entry; returns # of rows updated
         result = insertNewPerson.executeUpdate(); 
      }
      catch (SQLException sqlException)
      {
         sqlException.printStackTrace();
         close();
      } 
      
      return result;
   } 

   // update an entry
   public int updatePerson(String fname, String lname, String email, String num, String state,String addressID){
      int result = 0;
      // set parameters, then execute updateCurrentPerson
      try
      {
         updateCurrentPerson.setString(1, fname);
         updateCurrentPerson.setString(2, lname);
         updateCurrentPerson.setString(3, email);
         updateCurrentPerson.setString(4, num);
         updateCurrentPerson.setString(5,state);
         updateCurrentPerson.setString(6,addressID);

         // insert the new entry; returns # of rows updated
         result = updateCurrentPerson.executeUpdate();
      }
      catch (SQLException sqlException)
      {
         sqlException.printStackTrace();
         close();
      }

      return result;
   }
   public int deleteCurrentPerson(String addressID){
      int result = 0;
      try{
         deleteCurrentPerson.setString(1,addressID);
         result = deleteCurrentPerson.executeUpdate();
      }catch (SQLException sqlException){
          System.err.println("Could Not Delete");

         sqlException.printStackTrace();
         close();
      }
      return result;
   }

   // close the database connection
   public void close()
   {
      try 
      {
         connection.close();
      } 
      catch (SQLException sqlException)
      {
         sqlException.printStackTrace();
      } 
   } 
} // end class PersonQueries


/**************************************************************************
 * (C) Copyright 1992-2014 by Deitel & Associates, Inc. and               *
 * Pearson Education, Inc. All Rights Reserved.                           *
 *                                                                        *
 * DISCLAIMER: The authors and publisher of this book have used their     *
 * best efforts in preparing the book. These efforts include the          *
 * development, research, and testing of the theories and programs        *
 * to determine their effectiveness. The authors and publisher make       *
 * no warranty of any kind, expressed or implied, with regard to these    *
 * programs or to the documentation contained in these books. The authors *
 * and publisher shall not be liable in any event for incidental or       *
 * consequential damages in connection with, or arising out of, the       *
 * furnishing, performance, or use of these programs.                     *
 *************************************************************************/

 