package my.mybatis.generator.auto.entity;

public class User {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column user.userID
     *
     * @mbg.generated Sun Jul 17 17:11:38 CST 2022
     */
    private Integer userid;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column user.name
     *
     * @mbg.generated Sun Jul 17 17:11:38 CST 2022
     */
    private String name;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column user.userID
     *
     * @return the value of user.userID
     *
     * @mbg.generated Sun Jul 17 17:11:38 CST 2022
     */
    public Integer getUserid() {
        return userid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column user.userID
     *
     * @param userid the value for user.userID
     *
     * @mbg.generated Sun Jul 17 17:11:38 CST 2022
     */
    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column user.name
     *
     * @return the value of user.name
     *
     * @mbg.generated Sun Jul 17 17:11:38 CST 2022
     */
    public String getName() {
        return name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column user.name
     *
     * @param name the value for user.name
     *
     * @mbg.generated Sun Jul 17 17:11:38 CST 2022
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }
}