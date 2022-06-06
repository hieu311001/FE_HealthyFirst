import React from "react";
import 'bootstrap';
import './home.css'

function HomeBody() {
    return (
        <>  
            <div className="container image">
                <img alt="" src={require('./background.jpg')} width="100%" height="10%"/>
                <div class="text-block">
                    <h1 class="home-outline">Healthy First:</h1>
                    <h2 class="home-outline">Hỗ trợ quản lý an toàn vệ sinh thực phẩm.</h2>
                </div>
            </div>
            
            <div class="container about">
                <div class="row">
                    <h1 id="about" class="home-outline">About</h1>
                </div>
                <div class="row">
                    <p class="col-md-6 border-right">HealthyFirst là ứng dụng web được phát triển nhằm hỗ trợ các chi cục an toàn vệ sinh thực phẩm  trong  công tác  quản lý các cơ sở sản xuất thực phẩm hoặc kinh doanh dịch vụ ăn uống.
                    </p>

                    <p class="col-md-6">
                        Ứng dụng cung cấp các chức năng chính như sau: <br></br>
                        <ul>
                            <li>Quản lý các cơ sở sản xuất thực phẩm và/hoặc kinh doanh dịch vụ ăn uống.</li>
                            <li>Quản lý Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm.</li>
                            <li>Quản lý hoạt động thanh, kiểm tra điều kiện an toàn thực phẩm của các cơ sở.</li>
                        </ul>
                    </p>
                </div>
            </div>
        </>
    )
}

export default HomeBody