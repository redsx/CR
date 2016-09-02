import Immutable from 'immutable';

const shouldComponentUpdate = function(nextProps = {}, nextState = {}) {
  nextState = nextState || {};
  nextProps = nextProps || {};
  const thisProps = this.props || {}, thisState = this.state || {};
  if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length) {
    return true;
  }
  for (const key in nextProps) {
    if (!Immutable.is(thisProps[key], nextProps[key])) {
      return true;
    }
  }
  for (const key in nextState) {
    if (!Immutable.is(thisState[key], nextState[key])) {
      return true;
    }
  }
  return false;
}
export default shouldComponentUpdate;