import React from "react";

import "./Posts.css";

class ProjectCard extends React.Component{
    render(){
        const { title, tagline, description, imageHash, projectUrl, postIndex, tipAmount } = this.props;
        return (
            <div className="col-md-4">
                <div className="project-card">
                    <div className="row">
                        <div className="col-md-12">
                            <a href={projectUrl} target="_blank" rel="noopener noreferrer">
                                <h1 className="project-title">
                                    {title}
                                </h1>
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <p className="project-tagline">{tagline}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <img className="img-responsive" src={`https://ipfs.infura.io/ipfs/${imageHash}`} />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-12">
                            <p className="project-tagline">
                                {window.web3.utils.fromWei(tipAmount.toString(), 'Ether')} ETH
                            </p>
                        </div>
                    </div>
                    <br /><br />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="tip-amount">Tip Amount: (ETH)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    min="1"
                                    step="any"
                                    id="tip-amount"
                                    ref={(input) => { this.sponsTipAmount = input }}
                                />
                                <button
                                    className="btn btn-link btn-sm float-right pt-0"
                                    name={imageHash.id}
                                    onClick={async (event) => {
                                        let sponsTipAmount = window.web3.utils.toWei(this.sponsTipAmount.value.toString(), 'Ether');
                                        // console.log(postIndex, tipAmount);
                                        await this.props.tipProjectOwner(postIndex, sponsTipAmount);
                                        window.location.reload();
                                    }}
                                >Sponsor project growth</button>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-12">
                            <p className="project-description">{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class PostViewer extends React.Component {

    render(){
        let projects = [];
        let projectCard;
        // console.log("Props feed", this.props);
        for(let index = 0; index < this.props.posts.length; index++){
            projectCard = <ProjectCard
                key={this.props.posts[index].id._hex}
                {...this.props.posts[index]}
                tipProjectOwner={this.props.tipProjectOwner}
                postIndex={index + 1}
            />;
            projects.push(projectCard);
        }
        return (
            <div className="home">
                <div className="container">
                    <div className="row">
                        {projects}
                    </div>
                </div>
            </div>
        );
    }
}

export default PostViewer;