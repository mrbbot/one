class One {
    constructor(props) {
        this._props = props;
        this._parent = undefined;
        if(props.el) this._el = document.querySelector(props.el);
        Object.keys(this._props.data).map((key) => {
            let value = this._props.data[key];
            if(value instanceof One) value._parent = this;
            Object.defineProperty(this, key, {
                get: () => value,
                set: (newValue) => {
                    value = newValue;
                    this._findParent().render();
                }
            });
        });
        if(props.el) this.render();
    }

    _findParent() {
        if(this._parent) return this._parent._findParent(); else return this;
    }

    render() {
        let result = this._props.render ? this._props.render.bind(this).apply(null, arguments) : '';
        if(this._el) this._el.innerHTML = result; else return result;
    }
}
