window.onload = () => {
  let imgInfo = [
    {
      id: 1,
      authorName: 'Tobi',
      authorNickname: 'Murnau',
      imgSrc: 'https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      authorImgSrc: 'https://images.pexels.com/users/avatars/153731/tobi-dami-228.jpeg?auto=compress&fit=crop&h=40&w=40&dpr=1',
      autorgalleryList: [
        'https://images.pexels.com/photos/567952/pexels-photo-567952.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&fit=crop&dpr=1',
        'https://images.pexels.com/photos/713070/pexels-photo-713070.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&fit=crop&dpr=1',
        'https://images.pexels.com/photos/631988/pexels-photo-631988.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&fit=crop&dpr=1',
      ],
    },
    {
      id: 2,
      authorName: 'Fabian Wiktor',
      authorNickname: 'Berlin, Germany',
      imgSrc: 'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      authorImgSrc: 'https://images.pexels.com/users/avatars/369193/fabian-wiktor-985.jpeg?auto=compress&fit=crop&h=40&w=40&dpr=1',
      autorgalleryList: [
        'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&fit=crop&dpr=1',
        'https://images.pexels.com/photos/3471423/pexels-photo-3471423.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&fit=crop&dpr=1',
        'https://images.pexels.com/photos/3471422/pexels-photo-3471422.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&fit=crop&dpr=1',
      ],
    },
    {
      id: 3,
      authorName: 'Krivec Ales',
      authorNickname: 'Slovenia',
      imgSrc: 'https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      authorImgSrc: 'https://images.pexels.com/users/avatars/166939/ales-krivec-635.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=1',
      autorgalleryList: [
        'https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&fit=crop&dpr=1',
        'https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&fit=crop&dpr=1',
        'https://images.pexels.com/photos/547119/pexels-photo-547119.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&fit=crop&dpr=1',
      ],
    },
    {
      id: 4,
      authorName: 'AYDIN PHOTOGRAPHY',
      authorNickname: 'AYDIN PHOTOGRAPHY',
      imgSrc: 'https://images.pexels.com/photos/13975295/pexels-photo-13975295.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      authorImgSrc: 'https://images.pexels.com/users/avatars/298758980/ismail-aydin-573.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=1',
      autorgalleryList: [
        'https://images.pexels.com/photos/13393728/pexels-photo-13393728.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&fit=crop&dpr=1',
        'https://images.pexels.com/photos/14554874/pexels-photo-14554874.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&fit=crop&dpr=1',
        'https://images.pexels.com/photos/13393738/pexels-photo-13393738.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&fit=crop&dpr=1',
      ],
    },
    {
      id: 5,
      authorName: 'Artem Saranin',
      authorNickname: 'Russia',
      imgSrc: 'https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      authorImgSrc: 'https://images.pexels.com/users/avatars/359504/artem-saranin-872.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=1',
      autorgalleryList: [
        'https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&fit=crop&dpr=1',
        'https://images.pexels.com/photos/1496372/pexels-photo-1496372.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&fit=crop&dpr=1',
        'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=120&h=90&fit=crop&dpr=1',
      ],
    },
  ];
  // 假装我有很多图片
  for (let i = 0; i < 4; i++) {
    imgInfo = [...imgInfo, ...imgInfo];
  }

  // 最终渲染节点
  const renderDOM = document.querySelector('.photo-album');
  let prevMode = 1;

  // 获取内部 HTML，即每个图片的容器
  const getInnerHTML = (item) => {
    return `
<div class="photo-container">
  <!-- 平时显示的部分 -->
  <div class="show">
  <!-- hover 后显示的部分 -->
  <div class="hover-show">
    <!-- 左下 - 作者列表 -->
    <div class="author">
      <img class="author-img" src="${item.authorImgSrc}" alt="author">
      <span class="author-name">${item.authorName}</span>
      <!-- hover 头像才出来的内容 -->
      <div class="author-hover-show">
        <!-- 作者信息 -->
        <div class="author-info">
          <div class="author-info-left">
            <img class="author-img" src="${item.authorImgSrc}" alt="author">
            <div class="author-detail-info">
              <span>${item.authorName}</span>
              <span>${item.authorNickname}</span>
            </div>
          </div>
          <div class="author-info-right">
            <svg class="svg focus-on" t="1673085212762" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3817" width="200" height="200"><path d="M977.547636 837.818182H826.274909v151.272727a34.909091 34.909091 0 1 1-69.818182 0V837.818182h-151.272727a34.909091 34.909091 0 1 1 0-69.818182H756.456727v-151.272727a34.909091 34.909091 0 0 1 69.818182 0V768h151.272727a34.909091 34.909091 0 0 1 0 69.818182zM500.456727 605.090909c-6.423273 7.121455-12.846545 0-23.272727 0-174.871273 0-395.426909 167.68-395.426909 366.289455a34.909091 34.909091 0 0 1-35.095273 34.699636 34.909091 34.909091 0 0 1-35.118545-34.699636c0-164.119273 137.099636-350.161455 330.402909-408.994909C249.530182 510.789818 197.911273 414.952727 197.911273 302.545455 197.911273 136.471273 332.474182 0 500.456727 0s302.545455 136.471273 302.545455 302.545455c0 165.189818-135.796364 301.102545-302.545455 302.545454z m0-535.272727c-129.024 0-232.727273 105.169455-232.727272 232.727273s103.703273 232.727273 232.727272 232.727272 232.727273-105.169455 232.727273-232.727272S629.480727 69.818182 500.456727 69.818182z" fill="#323232" p-id="3818"></path></svg>
            <span>关注</span>
          </div>
        </div>
        <!-- 作者作品 -->
        <div class="author-gallery">
          <img src="${item.autorgalleryList[0]}" alt="img-1">
          <img src="${item.autorgalleryList[1]}" alt="img-2">
          <img src="${item.autorgalleryList[2]}" alt="img-3">
        </div>
      </div>
      <!-- 三角箭头 -->
      <!-- author-hover-arrow 的作用，是让用户 hover 的区域能变大，避免 hover 头像才出来的内容会消失 -->
      <div class="author-hover-arrow">
        <div class="arrow"></div>
      </div>
    </div>
    <!-- 右上 - 操作按钮 -->
    <div class="action-button">
      <div class="svg-container">
        <svg class="svg collection" t="1673088736494" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3025" width="200" height="200"><path d="M530.88 79.488a42.666667 42.666667 0 0 1 19.370667 19.370667l118.485333 240.064 264.96 38.506666a42.666667 42.666667 0 0 1 23.637333 72.768l-191.722666 186.88L810.88 900.906667a42.666667 42.666667 0 0 1-61.909333 44.992L512 821.333333l-236.970667 124.586667A42.666667 42.666667 0 0 1 213.12 900.906667l45.269333-263.850667-191.722666-186.88a42.666667 42.666667 0 0 1 23.658666-72.768l264.938667-38.506667 118.485333-240.064a42.666667 42.666667 0 0 1 57.130667-19.370666z m95.36 317.930667L512 165.909333l-114.24 231.509334L142.293333 434.56l184.853334 180.181333-43.648 254.421334L512 749.034667l228.48 120.106666-43.626667-254.421333 184.832-180.181333-255.445333-37.12z" fill="#333333" p-id="3026"></path></svg>
      </div>
      <div class="svg-container">
        <svg class="svg like" t="1673083659919" class="icon" viewBox="0 0 1179 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3173" xmlns:xlink="http://www.w3.org/1999/xlink" width="230.2734375" height="200"><path d="M142.31918 540.267127l350.13559 373.653781c54.296613 63.852817 139.806023 63.883844 195.033436-1.054906l362.204951-388.670672c42.661625-48.866952 65.466202-112.130263 65.466203-182.902021a279.239726 279.239726 0 0 0-501.018122-169.653647 30.99561 30.99561 0 0 1-25.534922 12.131415 30.99561 30.99561 0 0 1-25.503895-12.131415A279.239726 279.239726 0 0 0 62.053272 341.293309c0 72.850542 28.792718 144.242832 77.411458 195.498835 1.054906 1.116959 1.985705 2.264944 2.85445 3.474983z m-54.606879 31.926409A349.732244 349.732244 0 0 1 0 341.293309C0 152.806494 152.806184 0.00031 341.292999 0.00031c95.065613 0 183.708713 39.155615 247.313317 106.111096A340.486306 340.486306 0 0 1 835.95066 0.00031c188.486815 0 341.292999 152.806184 341.292999 341.292999 0 80.793361-25.069522 154.636755-72.198982 213.463257-1.147986 1.923651-2.482131 3.754223-4.095516 5.491715l-5.181449 5.553768c-2.699317 3.071637-5.491715 6.112247-8.315138 9.090804-0.620533 0.620533-1.210039 1.241065-1.861598 1.799545L733.810974 954.069375c-79.055869 93.048882-209.553901 93.017855-287.616918 1.147985L90.783938 576.040839a31.243823 31.243823 0 0 1-3.102664-3.847303z" fill="#666666" p-id="3174"></path></svg>
      </div>
    </div>
    <!-- 右下 - 下载按钮 -->
    <div class="svg-container download">
      <svg class="svg" t="1673083589533" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2098" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M952.8 668.48a40.16 40.16 0 0 0-39.2 39.2c0 86.24-57.6 156.96-130.88 156.96H241.28C168 864 110.4 793.92 110.4 707.68a40.16 40.16 0 0 0-39.2-39.2A40.16 40.16 0 0 0 32 707.68c0 130.72 94.24 235.36 209.28 235.36h541.44C897.76 943.04 992 838.4 992 707.68a40.16 40.16 0 0 0-39.2-39.2z" fill="#4592D8" p-id="2099"></path><path d="M484.48 686.72a45.12 45.12 0 0 0 57.6 0l149.12-149.12a38.88 38.88 0 0 0-54.88-54.88l-81.12 81.12V119.04a39.36 39.36 0 0 0-78.56 0v444.8l-81.12-81.12a38.88 38.88 0 0 0-54.88 54.88z" fill="#4592D8" p-id="2100"></path></svg>
    </div>
    <!-- hover 后图片遮罩 -->
    <div class="mask"></div>
  </div>
  <img class="scenery" src="${item.imgSrc}" alt="scenery">
  </div>
</div>
`;
  };

  // func: 滚动查找元素并将 String 累计起来，最终渲染到 renderDOM 节点上
  const reduceDOM = (limit) => {
    // 生成 limit 条字符串
    const htmlString = Array.from(Array(limit), () => '<div class="photo-list">');
    // 遍历并将 <img/> 添加到每一列上
    imgInfo.forEach((item, index) => {
      const surplus = index % limit;
      if (surplus < limit) {
        htmlString[surplus] += getInnerHTML(item);
      }
    });
    // 结尾设置 String
    for (let i = 0; i < limit; i++) {
      htmlString[i] += '</div>';
    }
    // 渲染到 HTML 上。记得处理下数组，要不然会产生逗号
    renderDOM.innerHTML = htmlString.join('');

    // 绑定所有下载节点
    const downloads = document.querySelectorAll('.download');
    // 点击下载图片
    downloads.forEach((download, index) => {
      download.onclick = () => {
        // 发起 xhr 请求，下载对应图片
        const req = new XMLHttpRequest();
        const img = document.querySelectorAll('.scenery')[index];
        req.open('GET', img.src, true);
        req.responseType = 'blob';
        // 加载完毕之后，创建 <a> 标签，并点击该 <a> 标签进行下载，绕开同源问题
        req.onload = () => {
          const url = window.URL.createObjectURL(req.response);
          const a = document.createElement('a');
          a.href = url;
          a.download = '';
          a.click();
        };
        req.send();
      };
    });
  };

  // func: 重排节点
  const resize = () => {
    const width = window.innerWidth;
    // 超过 1000px 显示 3 列，否则显示 2 列
    if (width >= 1900 && prevMode !== 6) {
      prevMode = 6;
      reduceDOM(prevMode);
    } else if (width >= 1600 && width < 1900 && prevMode !== 5) {
      prevMode = 5;
      reduceDOM(prevMode);
    } else if (width >= 1300 && width < 1600 && prevMode !== 4) {
      prevMode = 4;
      reduceDOM(prevMode);
    } else if (width >= 1000 && width < 1300 && prevMode !== 3) {
      prevMode = 3;
      reduceDOM(prevMode);
    } else if (width < 1000 && prevMode !== 2) {
      prevMode = 2;
      reduceDOM(prevMode);
    }
  };

  // 每次进来先执行一遍
  resize();

  // 每次拖拽，判断是否需要重新渲染
  window.onresize = () => {
    resize();
  };

};
