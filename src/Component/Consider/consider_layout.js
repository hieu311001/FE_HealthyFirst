import React from 'react';
import { Link } from "react-router-dom";

function Consider_layout() {
    return (
        <>   
            <div className="layout border">
                <Link to='/kehoach'>
                    <button type="button" className="btn btn-primary btn-lg">Lọc Cơ Sở</button>
                </Link>
                <Link to='/statistical'>
                    <button type="button" className="btn btn-primary btn-lg">Thống kê</button>
                </Link>
                <Link to='/suggestion'>
                    <button type="button" className="btn btn-primary btn-lg">Gợi ý</button>
                </Link>
            </div>
            
        </>
    )
}

export default Consider_layout;