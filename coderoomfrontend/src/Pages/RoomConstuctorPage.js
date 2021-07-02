import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import '../css/room-constructor.css'


function RoomConstructor(params) {
    const [items, setItems] = useState([
        {id: 1}
    ]);
    
    const addButton = useRef(null);

    const scrollToMyButton = () => {
        addButton.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const additem = () => {
        new Promise((resolve, reject) => {
            if (items.length > 0) {
                setItems([...items, {id: Math.max(...items.map(item => item.id)) + 1}]);
            } else {
                setItems([{id: 1}]);
            }
            resolve()
        })
        .then(() => scrollToMyButton());
    }

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    }


    return(
        <div className='room-constructor__main'>
            {items.map(item => {
                return (
                    <>
                    <div className='room-constructor__item room-construcor__text-item'>
                        
                        <TextareaAutosize className='room-constructor__textarea' placeholder={item.id}/>
                    <button onClick={() => removeItem(item.id)}>remove item</button>
                    </div>
                    </>
                )
            })}
            <div ref={addButton} className='room-constructor__add-item' onClick={() => additem()}>add item</div>
        </div>
    )
}

export default RoomConstructor;