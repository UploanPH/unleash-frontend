import { connect } from 'react-redux';
import Component from './list-component.jsx';
import { fetchProjects, removeProject } from './../../store/project/actions';
import { hasPermission } from '../../permissions';

const mapStateToProps = state => {
    const projects = state.projects.toJS();

    return {
        projects,
        hasPermission: hasPermission.bind(null, state.user.get('profile')),
    };
};

const mapDispatchToProps = dispatch => ({
    removeProject: project => {
        // eslint-disable-next-line no-alert
        if (window.confirm('Are you sure you want to remove this project?')) {
            removeProject(project)(dispatch);
        }
    },
    fetchProjects: () => fetchProjects()(dispatch),
});

const ProjectListContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export default ProjectListContainer;
