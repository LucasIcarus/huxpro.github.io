import keyMirror from 'fbjs/lib/keyMirror'

const ATs = {
	CHANGE_TOGGLE_STATE: 'CHANGE_TOGGLE_STATE',
	CHANGE_FIX_STATE: 'CHANGE_FIX_STATE',
	CHANGE_VISIBLE_STATE: 'CHANGE_VISIBLE_STATE',
	SET_RUNTIME_VARIABLE: 'SET_RUNTIME_VARIABLE',
	CHANGE_ABOUT_LANG: 'CHANGE_ABOUT_LANG',
	INDEX_NUM_INCREASE: 'INDEX_NUM_INCREASE',
	INDEX_NUM_DECREASE: 'INDEX_NUM_DECREASE',
	CATALOG_TOGGLE: 'CATALOG_TOGGLE',
	CHANGE_CATALOG_FIX_STATE: 'CHANGE_CATALOG_FIX_STATE',
};


export default keyMirror(ATs)
