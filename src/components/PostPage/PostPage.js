import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './PostPage.scss'
import AnchorJS from '../../core/anchor'
import catalogG from './catalog'
import {
	catalogToggle as toggle,
	changeCatalogFixState as fix,
} from '../../actions'
import {addEventListener, removeEventListener} from '../../core/DOMUtils';

import Row from '../../core/Row'
import Header from '../Header'
import SidebarTags from '../SidebarTags'
import Friends from '../Friends'
import Pager from '../Pager'
import {tags, friends, list, siteTitle as title, comment} from '../../constants'

import OnePageNav from './onePageNav'

class PostPage extends Component {

	constructor() {
		super();
		this._handleScroll = this.handleScroll.bind(this);
	}

	static propTypes = {
		header: PropTypes.object.isRequired,
		content: PropTypes.string.isRequired,
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
	};

	componentWillMount() {
		this.context.onSetTitle(`${this.props.header.title} - ${this.props.static.title}`);
	}

	componentDidMount() {

		const anchors = new AnchorJS({
			visible: 'always',
			placement: 'left',
			icon: '#',
		});
		anchors.add().remove('header h1').remove('.hidden-lg-down h5').remove('section h5');

		if (window.innerWidth >= 1200) {
			catalogG();
			addEventListener(window, 'scroll', this._handleScroll);
			const catalogBody = document.querySelector('#catalog-body');
			this.opn = new OnePageNav(catalogBody, {});
			this.opn.init();
		}

		if (comment.duoshuo_username) {

			// dynamic User by Hux
			var _user = comment.duoshuo_username;

			// duoshuo comment query.
			window.duoshuoQuery = {short_name: _user};
			(function () {
				var ds = document.createElement('script');
				ds.type = 'text/javascript';
				ds.async = true;
				ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
				ds.charset = 'UTF-8';
				(document.getElementsByTagName('head')[0]
				|| document.getElementsByTagName('body')[0]).appendChild(ds);
			})();
		}

		if (comment.disqus_username) {
			/* * * CONFIGURATION VARIABLES * * */
			var disqus_shortname = comment.disqus_username;
			var disqus_identifier = "{{page.id}}";
			var disqus_url = "{{site.url}}{{page.url}}";

			(function () {
				var dsq = document.createElement('script');
				dsq.type = 'text/javascript';
				dsq.async = true;
				dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
				(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
			})();
		}
	}

	componentWillUnmount() {
		if (window.innerWidth >= 1200) {
			removeEventListener(window, 'scroll', this._handleScroll);
			this.opn.destroy();
		}
	}

	render() {
		const {header, catalog, nav, path} = this.props;
		const {tags, friends, list, comment} = this.props.static;
		let previous = {}, next = {};
		let pos = -1;
		list.map((value, index) => {
			if (value.title === header.title) {
				pos = index;
			}
		});
		if (pos !== -1) {
			previous = pos === list.length - 1 ? {} : {
				to: list[pos + 1].path,
				text: 'PREVIOUS',
				sub: list[pos + 1].title,
			};
			next = pos === 0 ? {} : {
				to: list[pos - 1].path,
				text: 'NEXT',
				sub: list[pos - 1].title,
			};
		}
		return (
			<div className={s.root}>
				<Header style={header}/>
				<Row>
					<div>
						<div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
							<article
								className={s.post}
								dangerouslySetInnerHTML={{__html: this.props.content || ''}}/>
						</div>
						<div className="col-xl-2 offset-xl-0 hidden-lg-down">
							<div
								className={`${s.catalog} ${catalog.toggle ? s.fold : ''} ${catalog.fixed ? s.fixed : ''} ${nav ? s.navVisible : ''}`}>
								<hr/>
								<h5 id={s.catalogBrand}>
									<a href="#" className={s.catalogToggle}
										 onClick={(e) => this.catalogToggle(e)}>CATALOG</a>
								</h5>
								<ul id="catalog-body" className={s.catalogBody}>

								</ul>
							</div>
						</div>
						<div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
							{comment.duoshuo_username&&<section>
								<div className="ds-share flat"
										 data-thread-key={pos}
										 data-title={header.title}
										 data-images={header.image}
										 data-content={list[pos].summary}
										 data-url={`hrrp://linfatz.com${path}`}>
									<div className="ds-share-inline">
										<ul  className="ds-share-icons-16">

											<li data-toggle="ds-share-icons-more"><a className="ds-more" href="javascript:void(0);">分享到：</a></li>
											<li><a className="ds-weibo" href="javascript:void(0);" data-service="weibo">微博</a></li>
											<li><a className="ds-qzone" href="javascript:void(0);" data-service="qzone">QQ空间</a></li>
											<li><a className="ds-qqt" href="javascript:void(0);" data-service="qqt">腾讯微博</a></li>
											<li><a className="ds-wechat" href="javascript:void(0);" data-service="wechat">微信</a></li>

										</ul>
										<div className="ds-share-icons-more">
										</div>
									</div>
								</div>
							</section>}
							<Pager index={false} previous={previous} next={next}/>
							{comment.duoshuo_username&&<section className="comment">
								<div className="ds-thread"
										 data-thread-key={pos - list.length}
										 data-title={header.title}
										 data-url={`hrrp://linfatz.com${path}`}></div>
							</section>}
							<SidebarTags tags={tags}/>
							<Friends friends={friends}/>
						</div>
					</div>
				</Row>
			</div>
		)
	}

	catalogToggle(e) {
		e.preventDefault();
		this.props.toggle();
	}

	handleScroll() {
		const catalog = document.querySelector(`.${s.catalog}`);

		if (catalog) {
			let currentTop = window.scrollY;
			if (currentTop > document.querySelector('header').clientHeight + 41 && !this.props.catalog.fixed) {
				this.props.fix(true);
			}
			if (currentTop <= document.querySelector('header').clientHeight + 41 && this.props.catalog.fixed) {
				this.props.fix(false);
			}
		}
	}


}

function mapState(state) {
	return {
		static: {
			tags,
			list,
			friends,
			title,
			comment,
		},
		nav: state.nav.visible,
		catalog: state.catalog,
	}
}


export default connect(mapState, {toggle, fix})(withStyles(PostPage, s))

