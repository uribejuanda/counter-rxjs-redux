(function () {
    var store,
        buttonIncrement,
        buttonDecrement,
        counterText,
        actionTypes = {
            increment: 'INCREMENT',
            decrement: 'DECREMENT'
        };

    window.onload = function () {
        _init();
    }

    //     https://api.shortboxed.com/

    function _init() {
        store = Redux.createStore(_counter, 0);

        buttonIncrement = document.querySelector('#increment');
        buttonDecrement = document.querySelector('#decrement');
        counterText = document.querySelector('#counter');

        Rx.Observable.fromEvent(buttonIncrement, 'click')
            .subscribe(() => store.dispatch({
                type: actionTypes.increment
            }));

        Rx.Observable.fromEvent(buttonDecrement, 'click')
            .subscribe(() => store.dispatch({
                type: actionTypes.decrement
            }));

        _render();
        store.subscribe(_render);
    }

    function _render() {
        counterText.innerText = store.getState().toString();
    }

    function _counter(state, action) {
        if(typeof state === 'undefined') {
            return 0;
        }

        switch (action.type) {
            case actionTypes.increment:
                return state + 1;
            case actionTypes.decrement:
                return state -1;
            default:
                return state;
        }
    }
})();
