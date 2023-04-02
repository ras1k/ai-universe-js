const loadAi = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAi(data.data.tools, dataLimit);
}
const paramContainer = document.getElementById('param-container');
const displayAi = (params, dataLimit) => {
    // console.log(dataLimit);
    if (dataLimit && params.length > 6) {
        console.log(params.length)
        params = params.slice(0, dataLimit);

    }

    params.forEach(param => {
        // console.log(param);
        const paramDiv = document.createElement('div');
        paramDiv.classList.add('col');
        paramDiv.innerHTML = `
        <div class="card h-100">
            <img src="${param?.image}" class="card-img-top img-fluid h-100" alt="...">
            <div class="card-body">
            <h3>Features : </h3>
            <ol>
                <li>${param?.features[0] ? param.features[0] : ''}</li>
                <li>${param?.features[1] ? param.features[1] : ''}</li>
                <li>${param?.features[2] ? param.features[2] : ''}</li>
            </ol> 
            </div>
            <div class="card-footer">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <h5 class="card-title fw-bold">${param?.name ? param.name : 'No Name Found'}</h5>
                        <p> <i class="fa-solid fa-calendar"></i> ${param.published_in ? param.published_in : 'No Date Found'}</p>
                    </div>
                    <button onclick="loadData('${param.id}')" type="button" class="btn" style="background-color: rgba(165, 79, 79, 0.308); border: 1px; border-radius: 50%; padding: 15px" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <i class="fa-solid fa-arrow-right" style="color: #b60202;"></i>
                    </button>
                </div>
            </div>
        </div>`;
        paramContainer.appendChild(paramDiv);
    })
    toggleSpinner(false);
}

const processData = (dataLimit) => {
    toggleSpinner(true);
    loadAi(dataLimit);
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    paramContainer.innerHTML = '';
    processData();
    toggleSpinner(true);
    document.getElementById('btn-show-all').classList.add('d-none');
});

//details button
const loadData = async (id) => {

    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDataDetails(data.data))
}

const displayDataDetails = (param) => {
    document.getElementById('dataModalLabel').innerText = param.tool_name;
    document.getElementById('data-details').innerHTML = `
    <div class="d-md-flex gap-3 justify-content-center">
        <div class="border border-danger-subtle rounded bg-danger-subtle bg-opacity-25 p-2">
            <p class="fw-bold">${param?.description}</p>
            <div class="row d-md-flex gap-2 p-3 flex-md-nowrap flex-lg-nowrap justify-content-center">
                <div  class="col bg-light rounded">
                    <p class="text-success fw-bold border border-light p-5">
                    ${param?.pricing[0].price == 0 ? 'Free Of Cost' : param.pricing[0].price }/
                    ${param?.pricing[0].plan ? param.pricing[0].plan : 'Free Of Cost'}</p>
                </div>
                <div class="col bg-light rounded">
                    <p class="text-warning fw-bold p-5">
                    ${param?.pricing[1].price ? param.pricing[1].price : ''}/
                    ${param?.pricing[1].plan ? param.pricing[1].plan : ''}</p>
                </div>
                <div class="col bg-light rounded">
                    <p class="text-danger fw-bold p-5">
                    ${param?.pricing[2].price ? param.pricing[2].price : ''}/
                    ${param?.pricing[2].plan ? param.pricing[2].plan : ''}</p>
                </div>
            </div>
        <div class="row d-flex g-3">
            <div class="col rounded">
                <h3 class="fw-bold">Features</h3>
                <ul>
                    <li class ="text-secondary">${param?.features["1"].feature_name ? param.features["1"].feature_name : ''}</li>
                    <li class ="text-secondary">${param?.features["2"].feature_name ? param.features["2"].feature_name : ''}</li>
                    <li class ="text-secondary">${param?.features["3"].feature_name ? param.features["2"].feature_name : ''}</li>
                </ul>
            </div>
            <div class="col rounded">
                <h3 class="fw-bold">Integrations</h3>
                <ul>
                    <li class ="text-secondary">${param?.integrations[0] ? param.integrations[0] : ''}</li>
                    <li class ="text-secondary">${param?.integrations[1] ? param.integrations[1] : ''}</li>
                    <li class ="text-secondary">${param?.integrations[2] ? param.integrations[2] : ''}</li>
                </ul>
            </div>
        </div>
    </div>
        <div>
            <img src="${param?.image_link[0] ? param.image_link[0] : ''}" class="mb-5 w-100" alt="">
            <p class="btn btn-danger position-absolute top-0 end-0 m-4 d-none d-lg-block d-md-block">${param?.accuracy['score'] ? param.accuracy['score'] : ''}</p>
            <div class="text-center">
                <p class="fw-bold mb-2">${param?.input_output_examples[0].input ? param.input_output_examples[0].input : ''}</p>
                <p class="text-secondary">${param?.input_output_examples[0].output ? param.input_output_examples[0].output : ''}</p>
            </div>
        </div>
    </div>
    `
}


loadAi(6);
