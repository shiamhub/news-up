let fetchData = [];
let fetchData2 = [];
// console.log(fetchData2);


const loadNews = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        displayNews(data.data.news_category);
    }
    catch (error) {
        console.log(error);

    }
};
loadNews();

function displayNews(datas) {
    const newsTitle = document.getElementById('news-title');
    datas.forEach(data => {
        console.log(data.category_name)
        newsTitle.innerHTML += `
        <a href="#" onclick="loadNewsId('${data.category_id}', '${data.category_name}')">${data.category_name}</a>
        `;
    })
};

const loadNewsId = async (id, da) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
        const data = await res.json();
        fetchData = data.data;
        fetchData2 = data.data;
        displayAlert(data.data, da);
    }
    catch(error) {
        console.log(error);
    }
};
loadNewsId('01', 'Breaking News');

function displayAlert(datas, da) {
    // console.log(datas)
    document.getElementById('alert-number').innerText = datas.length;
    document.getElementById('alert-title').innerText = da;
    const newsPag = document.getElementById('news-pag');
    newsPag.textContent = '';
    datas.forEach(data => {
        console.log(data);
        const { image_url, title, details, author, total_view, rating, _id } = data
        newsPag.innerHTML += `
        <div class="card card-side bg-base-100 shadow-xl mt-6">
            <figure><img src="${image_url}" class="p-4 w-[1000px] h-80" alt="Movie"/></figure>
            <div class="flex flex-col">
                <div class="card-body">
                    <h2 class="card-title">${title}</h2>
                    <p>${details.slice(0, 200)}</p>
                </div>
                <div class="flex items-center justify-between mb-4 px-6">
                    <div class="flex items-center gap-2">
                        <div>
                            <img class="w-10 rounded-full" src="OIP (1).jpg" />
                        </div>
                        <div>
                            <p>${author.name ? author.name : 'not available'}</p>
                            <p>${new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="flex">
                        <p><i class="fa-solid fa-eye"></i></p>
                        <p>${total_view}</p>
                    </div>
                    <div class="flex gap-2 items-center">
                        <div class="flex gap-2">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half"></i>
                        </div>
                        <p>${rating.number}</p>
                    </div>

                    <label for="my-modal-6" class="btn btn-primary" onclick="loadModalId('${_id}')"><i class="fa-solid fa-arrow-right-long"></i></label>
                </div>
            </div>
        </div>
        `;
    });

};

const loadModalId = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
        const data = await res.json();
        displayModal(data.data);
    }
    catch (error) {
        console.log(error);

    }
};
loadModalId();

function displayModal(datas) {
    // console.log(datas)
    const modalDiv = document.getElementById('modal-div');
    modalDiv.textContent = '';
    datas.forEach(data => {
        console.log(data.others_info)
        const { image_url, title, details, author, total_view, rating, others_info } = data
        console.log(data.others_info.is_trending);
        modalDiv.innerHTML += `
        <div class="modal-box">
            <figure><img src="${image_url}" class="p-4 w-[1000px] h-80" alt="Movie"/></figure>
            <h3 class="font-bold text-lg">${title}${others_info?.is_trending ? `<span class="badge text-bg-warning">Trending</span>` : ""}</h3>
            <p class="py-4">${details}</p>
            <div class="modal-action">
                <label for="my-modal-6" class="btn">Yay!</label>
            </div>
        </div>
        `;
    });
};

const showTrending=()=>{
    const trendingNews = fetchData.filter(singleData => singleData.others_info.is_trending === true);
    const category_name = document.getElementById("alert-title").innerText;
    displayAlert(trendingNews, category_name);
}

const showTodaysPick = () => {
    const trendingNews = fetchData2.filter(singleData => singleData.others_info.is_todays_pick === true);
    const category_name = document.getElementById("alert-title").innerText;
    displayAlert(trendingNews, category_name);
};
