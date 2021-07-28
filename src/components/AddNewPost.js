import React from "react";

class AddNewPost extends React.Component{

    render(){
        return (
            <div className="add-new-post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <center>
                                <h2>New project</h2>
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        const title = this.title.value;
                                        const tagline = this.tagline.value;
                                        const description = this.description.value;
                                        const projectUrl = this.projectUrl.value;
                                        this.props.uploadPost(title, tagline, description, projectUrl);
                                    }}
                                >
                                    <input type='file' accept=".jpg, .jpeg, .png" onChange={this.props.captureFile} />
                                    <div className="form-group">
                                        <br></br>
                                        <input
                                            id="title"
                                            type="text"
                                            ref={(input) => { this.title = input }}
                                            className="form-control"
                                            placeholder="Title"
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <br></br>
                                        <input
                                            id="tagline"
                                            type="text"
                                            ref={(input) => { this.tagline = input }}
                                            className="form-control"
                                            placeholder="Tagline"
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <br></br>
                                        <input
                                            id="projectUrl"
                                            type="text"
                                            ref={(input) => { this.projectUrl = input }}
                                            className="form-control"
                                            placeholder="Project URL"
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <br></br>
                                        <textarea
                                            id="description"
                                            type="text"
                                            ref={(input) => { this.description = input }}
                                            className="form-control"
                                            placeholder="Project description"
                                            required />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block btn-lg">Upload!</button>
                                </form>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNewPost;