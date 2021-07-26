const { assert } = require('chai');

const Pathon = artifacts.require('./Pathon.sol');

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Pathon', ([deployer, author, tipper]) => {
  let pathon

  before(async () => {
    // Pathon = await Pathon.deployed()
    pathon = await Pathon.deployed();
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await Pathon.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await pathon.name()
      assert.equal(name, 'Pathon')
    })
  })

  describe('post', async () => {
    let result, postCount;
    const hash = 'abc123';

    before(async () => {
      result = await pathon.uploadPost(
        hash,
        'Pathon',
        'A new blockchain based crowd fund raising platform',
        'This project was built for everyone to be able to use ETH to sponsor the growth and BUIDL of projects',
        'http://pathon.web.app',
        { from: author }
      );
      postCount = await pathon.postCount();
    });

    it('creates posts', async () => {
      assert.equal(postCount, 1);

      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct');
      assert.equal(event.title, 'Pathon', 'title is correct');
      assert.equal(event.imageHash, hash, 'hash is correct');
      assert.equal(event.tagline, 'A new blockchain based crowd fund raising platform', 'tagline is correct');
      assert.equal(event.description, 'This project was built for everyone to be able to use ETH to sponsor the growth and BUIDL of projects', 'description is correct');
      assert.equal(event.tipAmount, '0', 'tip is correct');
      assert.equal(event.projectUrl, 'http://pathon.web.app', 'project url is correct');
      assert.equal(event.author, author, 'author is correct');

      await pathon.uploadPost('', 'title', 'tagline', 'description', 'websiteurl', { from: author }).should.be.rejected;
      await pathon.uploadPost('imageHash', '', 'tagline', 'description', 'websiteurl', { from: author }).should.be.rejected;
      await pathon.uploadPost('imageHash', 'title', '', 'description', 'websiteurl', { from: author }).should.be.rejected;
      await pathon.uploadPost('imageHash', 'title', 'tagline', '', 'websiteurl', { from: author }).should.be.rejected;
      await pathon.uploadPost('imageHash', 'title', 'tagline', 'description', '', { from: author }).should.be.rejected;
    })

    it('lists images', async () => {
      const image = await pathon.posts(postCount);
      assert.equal(image.id.toNumber(), postCount.toNumber(), 'id is correct');
      assert.equal(image.title, 'Pathon', 'title is correct');
      assert.equal(image.imageHash, hash, 'hash is correct');
      assert.equal(image.tagline, 'A new blockchain based crowd fund raising platform', 'tagline is correct');
      assert.equal(image.description, 'This project was built for everyone to be able to use ETH to sponsor the growth and BUIDL of projects', 'description is correct');
      assert.equal(image.tipAmount, '0', 'tip is correct');
      assert.equal(image.projectUrl, 'http://pathon.web.app', 'project url is correct');
      assert.equal(image.author, author, 'author is correct');
    });

    it('allows people to fund projects', async () => {
      // beginning to draft this up
    });
  });

})