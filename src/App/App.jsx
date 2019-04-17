import React, { PureComponent } from 'react';
import { RootApp, FooterVersion, ContentContainer } from './App.styles';
import SynarenBanner from '../SynarenBanner';
import { Route } from 'react-router-dom';
import BlogContainer from '../BlogContainer';

class App extends PureComponent {
	render() {
		return (
			<RootApp className="primary-colour">
				<SynarenBanner/>
				<ContentContainer>
					<Route path="**" exact component={BlogContainer}/>
				</ContentContainer>
				<FooterVersion>© Nam Phan; v:{process.env.REACT_APP_API_VERSION_NUMBER}</FooterVersion>
			</RootApp>
		);
	}
}

export default App;
