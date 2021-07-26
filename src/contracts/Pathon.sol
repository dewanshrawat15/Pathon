pragma solidity ^0.5.0;

contract Pathon {
  string public name = "Pathon";
  
  // Store project details
  uint public postCount = 0;
  mapping(uint => Post) public posts;

  struct Post {
    uint id;
    string title;
    string imageHash;
    string tagline;
    string description;
    string projectUrl;
    uint tipAmount;
    address payable author;
  }

  event PostCreated (
    uint id,
    string title,
    string imageHash,
    string tagline,
    string description,
    string projectUrl,
    uint tipAmount,
    address payable author
  );

  event PostTipped (
    uint id,
    string title,
    string imageHash,
    string tagline,
    string description,
    string projectUrl,
    uint tipAmount,
    address payable author
  );

  // Create projects
  function uploadPost(string memory _imgHash, string memory _title, string memory _tagline, string memory _description, string memory _projecturl) public {
    require(bytes(_imgHash).length > 0);
    require(bytes(_title).length > 0);
    require(bytes(_description).length > 0);
    require(bytes(_tagline).length > 0);
    require(bytes(_projecturl).length > 0);
    require(msg.sender != address(0x0));
    postCount = postCount + 1;
    posts[postCount] = Post(postCount, _title, _imgHash, _tagline, _description, _projecturl, 0, msg.sender);
    emit PostCreated(postCount, _title, _imgHash, _tagline, _description, _projecturl, 0, msg.sender);
  }

  function tipPostOwner(uint _id) public payable {

    require(_id > 0 && _id <= postCount);

    Post memory _post = posts[_id];
    address payable _author = _post.author;
    address(_author).transfer(msg.value);
    _post.tipAmount = _post.tipAmount + msg.value;
    posts[_id] = _post;
    emit PostCreated(_post.id, _post.title, _post.imageHash, _post.tagline, _post.description, _post.projecturl, _post.tipAmount, _author);
  }

  // Tip projects
}