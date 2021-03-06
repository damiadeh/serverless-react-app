import React, { Component, Fragment } from 'react';
import Banner from '../../components/banner/banner';
import SearchLocation from '../../components/search-location/search-location';
import { connect } from 'react-redux';
import Projects from '../../components/projects/projects';
import * as projectActions from '../../redux/actions/export'
import Modal from '../../components/modal/modal';
import Footer from '../../components/footer/footer';
import ProjectSummary from '../../components/projects/project-details';
import './homepage.css';

class Homepage extends Component {
    state = {
        showDetails: false,
        project: {
            name: "22222222",
            city: "",
            state: "",
            details: "",
            budget: ""
        },
        showSortBudget: false,
        currentLoad: "all",
    }

    closeDetails = () => {
        this.setState({ showDetails: false });
    }

    showProjectDetails = (project) => {
        this.setState({ showDetails: true, project })
    }

    toggleSortBudgetOptions = () => {
        this.setState({ showSortBudget: !this.state.showSortBudget });
    }

    fetchProjectsAll = () => {
        if(this.state.currentLoad === "all") return;
        this.setState({currentLoad : "all"});
        this.props.refreshProject();
        this.props.fetchProjects();
    }

    sortDesc = () => {
        if(this.state.currentLoad === "desc") return;
        this.setState({currentLoad : "desc"});
        this.props.refreshProject();
        this.props.fetchProjectsDesc();
    }

    sortAsc = () => {
        if(this.state.currentLoad === "asc") return;
        this.setState({currentLoad : "asc"});
        this.props.refreshProject();
        this.props.fetchProjectsAsc();
    }

    render() {
        return (
            <Fragment>
                <Modal show={this.state.showDetails} modalClosed={this.closeDetails}>
                    <ProjectSummary project={this.state.project} name="tttt" />
                </Modal>
                <Banner />
                <SearchLocation />
                <Projects
                    showDetails={this.showProjectDetails}
                    showOptions={this.state.showSortBudget}
                    toggle={this.toggleSortBudgetOptions}
                    fetchProjects={this.fetchProjectsAll}
                    sortDescending={this.sortDesc}
                    sortAscending={this.sortAsc}
                />
                <Footer />

                <div onClick={() => this.props.history.push("/add")} className="add-project">
                    <span className="fa fa-plus"></span>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        projects: state.project.projects,
        fetchingProject: state.project.FetchingProject,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProjects: () => dispatch(projectActions.fetchProjects()),
        fetchProjectsDesc: () => dispatch(projectActions.fetchSortedProjectsDesc()),
        fetchProjectsAsc: () => dispatch(projectActions.fetchSortedProjectsAsc()),
        refreshProject: () => dispatch(projectActions.clearProjects()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);