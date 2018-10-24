class One {
    constructor(props) {
        this._props = props;
        this._parent = undefined;
        if(props.el) this._el = document.querySelector(props.el);
        if(this._props.data) {
            Object.keys(this._props.data).map((key) => {
                let value = this._props.data[key];
                if (value instanceof One) value._parent = this;
                Object.defineProperty(this, key, {
                    get: () => value,
                    set: (newValue) => {
                        value = newValue;
                        this._findParent().render();
                    }
                });
            });
        }
        if(this._el) this.render();
    }
    _findParent() {
        return this._parent ? this._parent._findParent() : this;
    }
    render() {
        let result = this._props.render ? this._props.render.bind(this).apply(null, arguments) : '';
        if(this._el) this._el.innerHTML = result; else return result;
    }
}
