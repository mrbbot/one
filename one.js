class One {
    constructor(props) {
        this._props = props;
        this._parentRender = undefined;
        if(props.el) this._el = document.querySelector(props.el);
        Object.keys(this._props.data).map((key) => {
            let value = this._props.data[key];
            if(value instanceof One) value._parentRender = this.render.bind(this);
            Object.defineProperty(this, key, {
                get: () => value,
                set: (newValue) => {
                    value = newValue;
                    this._parentRender ? this._parentRender() : this.render();
                }
            });
        });
        if(props.el) this.render();
    }

    render() {
        let result = this._props.render ? this._props.render.bind(this).apply(null, arguments) : '';
        if(this._el) this._el.innerHTML = result; else return result;
    }
}
