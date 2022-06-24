const RenderPosition = {
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
};

export const render = (container, element, position = RenderPosition.BEFOREEND) => {
    switch (position) {
        case RenderPosition.AFTERBEGIN:
            container.prepend(element);
            break;
        case RenderPosition.BEFOREEND:
            container.append(element);
            break;
    }
};

export const renderPoint = (PointView, EditPointView, pointListElement, pointData) => {
    const pointComponent = new PointView(pointData);
    const pointEditorComponent = new EditPointView(pointData);

    const changeViewToPoint = () => {
        pointListElement.replaceChild(pointComponent.getElement(), pointEditorComponent.getElement());
    };
    const changeViewToEdit = () => {
        pointListElement.replaceChild(pointEditorComponent.getElement(), pointComponent.getElement());
    };

    pointComponent.setEditClickHandler(changeViewToEdit);
    pointEditorComponent.setEditClickHandler(changeViewToPoint);
    pointEditorComponent.setFormSubmitHandler(() => {
        // evt.preventDefault();
        changeViewToPoint();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            pointListElement.replaceChild(pointComponent.getElement(), pointEditorComponent.getElement());
        }
    });
    render(pointListElement, pointComponent.getElement());
};