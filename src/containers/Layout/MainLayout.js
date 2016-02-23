import React from 'react';

class MainLayout extends React.Component {
    render() {
        const {children} = this.props;

        return(
            <div>
                Main Layout
                <div>
                    { this.props.children }
                </div>
            </div>
        )
    }
}

export default MainLayout;