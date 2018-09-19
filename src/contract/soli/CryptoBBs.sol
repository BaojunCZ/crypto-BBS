pragma solidity ^0.4.24;

// 安全数学库
library SafeMath {

    function mul(uint256 a, uint256 b)
    internal
    pure
    returns (uint256 c)
    {
        if (a == 0) {
            return 0;
        }
        c = a * b;
        require(c / a == b, "SafeMath mul failed");
        return c;
    }

    function div(uint256 a, uint256 b)
    internal
    pure
    returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    function sub(uint256 a, uint256 b)
    internal
    pure
    returns (uint256)
    {
        require(b <= a, "SafeMath sub failed");
        return a - b;
    }

    function add(uint256 a, uint256 b)
    internal
    pure
    returns (uint256 c)
    {
        c = a + b;
        require(c >= a, "SafeMath add failed");
        return c;
    }

    function sqrt(uint256 x)
    internal
    pure
    returns (uint256 y)
    {
        uint256 z = ((add(x, 1)) / 2);
        y = x;
        while (z < y)
        {
            y = z;
            z = ((add((x / z), z)) / 2);
        }
    }

    function sq(uint256 x)
    internal
    pure
    returns (uint256)
    {
        return (mul(x, x));
    }

    function pwr(uint256 x, uint256 y)
    internal
    pure
    returns (uint256)
    {
        if (x == 0)
            return (0);
        else if (y == 0)
            return (1);
        else
        {
            uint256 z = x;
            for (uint256 i = 1; i < y; i++)
                z = mul(z, x);
            return (z);
        }
    }
}


library CryptoBBSDatasets {
    struct Player {
        address playerAddress;
        string name;//昵称
        bool sex;//性别 true 男 false 女,
        string icon;
        uint256[] msgID;//帖子ID
        uint256 favoriteSize;
        mapping(uint256 => uint256) favorite;//index=>id 收藏
        mapping(uint256 => bool) isFavorite;// id=>bool
    }

    struct Message {
        string imgUrl;//图片地址
        string info;//信息
        uint256 favoriteCount;
        address writer;//作者
        uint256 id;//帖子ID
        Discuss[] discuss;//评论
    }

    struct Discuss {
        address writer;//评论者
        address to;//评论给谁
        string info;//评论内容
        uint256 time;//评论时间
    }
}

contract CryptoBBS {
    using SafeMath for *;

    address public Owner;
    uint256 public playerCount;
    //名字
    string public BBSName;
    //详细介绍
    string public BBSDescribe;
    //logo
    string public BBSLogo;
    //简介
    string public BBSSynopsis;

    uint256[] public MsgIDs;
    //地址=>用户
    mapping(address => CryptoBBSDatasets.Player) public player;
    //ID=>帖子
    mapping(uint256 => CryptoBBSDatasets.Message) public data;
    //address=>管理员权限
    mapping(address => bool) admin;
    //address=>禁言
    mapping(address => bool) banned;

    constructor(string _BBSName, string _BBSSynopsis, string _BBSDescribe, string _BBSLogo) public {
        require(bytes(_BBSName).length != 0);
        require(bytes(_BBSSynopsis).length != 0);
        Owner = msg.sender;
        playerCount = 1;
        BBSName = _BBSName;
        BBSSynopsis = _BBSSynopsis;
        BBSDescribe = _BBSDescribe;
        BBSLogo = _BBSLogo;
        player[msg.sender].name = "Owner";
        player[msg.sender].playerAddress = msg.sender;
        admin[msg.sender] = true;
    }
    //=============================群信息相关========================================
    function setBBSName(string name) onlyOwner() public payable {
        BBSName = name;
    }

    function setBBSDescribe(string desc) onlyOwner() public payable {
        BBSDescribe = desc;
    }

    function setBBSLogo(string logo) onlyOwner() public payable {
        BBSLogo = logo;
    }

    function setBBSSynopsis(string synopsis) onlyOwner() public payable {
        require(bytes(synopsis).length <= 20);
        BBSSynopsis = synopsis;
    }
    //=============================合约持有者（版主）权限相关==========================================
    //合约转移持有者权限
    function transferOwner(address _address) onlyOwner() public payable {
        Owner = _address;
    }

    //添加管理员
    function addAdmin(address _address) onlyOwner() public payable {
        admin[_address] = true;
    }

    //移除管理员
    function removeAdmin(address _address) onlyOwner() public payable {
        //防止版主移除自己的权限
        require(_address != msg.sender);
        admin[_address] = false;
    }

    //仅合约持有者
    modifier onlyOwner (){
        require(Owner == msg.sender);
        _;
    }

    //仅管理员
    modifier onlyAdmin(){
        require(admin[msg.sender]);
        _;
    }

    //必须注册
    modifier isLogin(address _address){
        require(player[_address].playerAddress == _address);
        _;
    }

    //保持顶级权限
    modifier notOwner(address _address){
        require(_address != Owner);
        _;
    }
    //=============================管理员权限相关=====================================
    //删帖
    function deleteMsg(uint256 id) onlyAdmin() isLogin(msg.sender) msgExist(id) public payable {
        delete data[id];
    }

    //禁言
    function setBanned(address _address, bool isBanned) onlyAdmin() notOwner(_address) notAdmin(_address) isLogin(msg.sender) public payable {
        if (isBanned)
            banned[_address] = false;
        else
            banned[_address] = true;
    }

    //踢人
    function throwPlayer(address _address) onlyAdmin() notOwner(_address) notAdmin(_address) isLogin(msg.sender) public payable {
        delete player[_address];
    }

    //保持管理员权限
    modifier notAdmin(address _address){
        require(!admin[_address]);
        _;
    }
    //=============================发帖评论相关=======================================

    //发帖
    function sendMessage(string imgUrl, string info) isLogin(msg.sender) public payable {
        require(bytes(imgUrl).length != 0 || bytes(info).length != 0);
        uint256 time = now;
        //帖子内容
        data[time].writer = msg.sender;
        data[time].info = info;
        data[time].imgUrl = imgUrl;
        data[time].id = time;
        //用户数据
        player[msg.sender].msgID.push(time);
        MsgIDs.push(time);
    }

    function getMsgIDSize() public view returns (uint256){
        return MsgIDs.length;
    }

    function getMsgs(uint256 start) public view returns (uint256, uint256, uint256, uint256, uint256){
        require(start <= MsgIDs.length);
        require(start > 0);
        if (start == 1)
            return (MsgIDs[0], 0, 0, 0, 0);
        if (start == 2)
            return (MsgIDs[1], MsgIDs[0], 0, 0, 0);
        if (start == 3)
            return (MsgIDs[2], MsgIDs[1], MsgIDs[0], 0, 0);
        if (start == 4)
            return (MsgIDs[3], MsgIDs[2], MsgIDs[1], MsgIDs[0], 0);
        else
            return (MsgIDs[start - 1], MsgIDs[start - 2], MsgIDs[start - 3], MsgIDs[start - 4], MsgIDs[start - 5]);
    }

    function getLikeCount(uint256 id) public view returns (uint256){
        return data[id].favoriteCount;
    }

    //评论
    function discussMsg(uint256 id, string info, address to) notNull(info) msgExist(id) isLogin(msg.sender) public payable {
        CryptoBBSDatasets.Discuss memory discuss = CryptoBBSDatasets.Discuss(msg.sender, to, info, now);
        data[id].discuss.push(discuss);
    }

    //获取评论总个数
    function getDiscussMsgLength(uint256 id) msgExist(id) public view returns (uint256){
        return data[id].discuss.length;
    }

    //获取评论数据
    function getDiscussMsg(uint256 id, uint256 index) public view returns (address, address, string, uint256){
        CryptoBBSDatasets.Discuss memory discuss = data[id].discuss[index];
        return (discuss.writer, discuss.to, discuss.info, discuss.time);
    }

    //帖子是否存在
    modifier msgExist(uint256 id){
        require(data[id].id == id);
        _;
    }

    //=================================用户相关方法=======================================

    //初始化用户
    function initPlayer(string name, bool sex, string icon) notNull(name) public payable {
        player[msg.sender].name = name;
        player[msg.sender].sex = sex;
        player[msg.sender].icon = icon;
        player[msg.sender].playerAddress = msg.sender;
        playerCount = SafeMath.add(playerCount, 1);
    }

    function setName(string name) isLogin(msg.sender) notNull(name) public payable {
        player[msg.sender].name = name;
    }

    function setSex(bool sex) isLogin(msg.sender) public payable {
        player[msg.sender].sex = sex;
    }

    function setIcon(string icon) isLogin(msg.sender) public payable {
        player[msg.sender].icon = icon;
    }

    //收藏
    function favorite(uint256 id) msgExist(id) public payable {
        require(!player[msg.sender].isFavorite[id]);
        player[msg.sender].favorite[player[msg.sender].favoriteSize] = id;
        player[msg.sender].favoriteSize = SafeMath.add(player[msg.sender].favoriteSize, 1);
        player[msg.sender].isFavorite[id] = true;
        data[id].favoriteCount = SafeMath.add(data[id].favoriteCount, 1);
    }

    //取消收藏
    function unFavorite(uint256 index, uint256 id) public payable {
        require(player[msg.sender].favorite[index] == id);
        delete player[msg.sender].favorite[index];
        player[msg.sender].isFavorite[id] = false;
        data[id].favoriteCount = SafeMath.sub(data[id].favoriteCount, 1);
    }

    //获取收藏列表
    function getFavorite(uint256 index) public view returns (uint256){
        return player[msg.sender].favorite[index];
    }

    //获取收藏列表长度
    function getFavoriteSize() public view returns (uint256){
        return player[msg.sender].favoriteSize;
    }

    //判断是否收藏
    function isFavorite(uint256 id) public view returns (bool){
        return player[msg.sender].isFavorite[id];
    }

    //获取用户帖子id列表
    function getPlayerMsg(address _address) public view returns (uint256[]){
        return player[_address].msgID;
    }

    function getPlayerMsgSize(address _address) public view returns (uint256){
        return player[_address].msgID.length;
    }

    modifier notNull(string info){
        require(bytes(info).length != 0);
        _;
    }
}