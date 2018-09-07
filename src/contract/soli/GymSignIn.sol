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


library GymDatasets {
    struct Player {
        address playerAddress;
        string name;
        mapping(uint256 => uint256) bonus;
        mapping(uint256 => uint256[]) proofTimes;
    }

    struct Round {
        uint256 totalBonus;
        uint256 startTime;
        uint256 endTime;
        uint256 roundID;
    }

    struct Proof {
        string url;
        address[] reporters;
    }
}

contract GymSignIn {
    using SafeMath for *;

    address public owner;
    uint256 public nowRoundID;
    mapping(address => GymDatasets.Player) public player;
    mapping(uint256 => GymDatasets.Round) public round;
    mapping(uint256 => mapping(uint256 => mapping(address => GymDatasets.Proof))) data;
    mapping(uint256 => uint256[]) roundProofTimes;

    constructor() public {
        owner = msg.sender;
        nowRoundID = 0;
        player[msg.sender].name = "Owener";
        player[msg.sender].playerAddress = msg.sender;
        start();
    }

    //开始新一轮激励
    function start() onlyOwner() private {
        nowRoundID = SafeMath.add(nowRoundID, 1);
        round[nowRoundID].roundID = nowRoundID;
        round[nowRoundID].startTime = now;
    }

    //结束上一轮激励
    function end() onlyOwner() public payable {
        round[nowRoundID].endTime = now;
        start();
    }

    //签到
    function singIn(string url) isLogin(msg.sender) public payable {
        uint256 time = now;
        data[nowRoundID][time][msg.sender].url = url;
        player[msg.sender].proofTimes[nowRoundID].push(time);
        roundProofTimes[nowRoundID].push(time);
        player[msg.sender].bonus[nowRoundID] = SafeMath.add(player[msg.sender].bonus[nowRoundID], 1);
        round[nowRoundID].totalBonus = SafeMath.add(round[nowRoundID].totalBonus, 1);
    }

    //获取用户证明文件时间列表
    function getPlayerProofTimes(address _address, uint256 roundID_) view public returns (uint256[]){
        return player[_address].proofTimes[roundID_];
    }

    //获取轮次证明文件时间列表
    function getProofProofTimes(uint256 roundID_) view public returns (uint256[]){
        return roundProofTimes[roundID_];
    }

    //获取证明文件地址
    function getProofUrl(address _address, uint256 roundID_, uint256 time) view public returns (string){
        return data[roundID_][time][_address].url;
    }

    //获取证明文件举报人地址
    function getProofReporter(address _address, uint256 roundID_, uint256 time) view public returns (address[]){
        return data[roundID_][time][_address].reporters;
    }

    //获取玩家奖励值
    function getRoundBonus(address _address, uint256 roundID_) view public returns (uint256){
        return player[_address].bonus[roundID_];
    }

    //举报不合法图片
    function report(address _address, uint256 time) isLogin(msg.sender) public payable {
        require(_address != msg.sender);
        uint length = data[nowRoundID][time][_address].reporters.length;
        for (uint i = 0; i < length; i++) {
            if (data[nowRoundID][time][_address].reporters[i] == msg.sender) {
                require(false);
            }
        }
        data[nowRoundID][time][_address].reporters.push(msg.sender);
    }

    //惩罚
    function punish(address _address, uint8 bonus) onlyOwner() public payable {
        player[_address].bonus[nowRoundID] = SafeMath.sub(player[_address].bonus[nowRoundID], bonus);
        round[nowRoundID].totalBonus = SafeMath.sub(round[nowRoundID].totalBonus, bonus);
    }

    function getPlayerName(address _address) public view returns (string){
        return player[_address].name;
    }

    function initPlayer(string name) public payable {
        require(bytes(name).length != 0);
        player[msg.sender].name = name;
        player[msg.sender].playerAddress = msg.sender;
    }

    function setName(string name) isLogin(msg.sender) public payable {
        require(bytes(name).length != 0);
        player[msg.sender].name = name;
    }

    modifier onlyOwner (){
        require(owner == msg.sender);
        _;
    }

    modifier isLogin(address _address){
        require(player[_address].playerAddress == _address);
        _;
    }
}