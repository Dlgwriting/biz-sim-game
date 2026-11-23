/* Each of the six faces is equally likely. Earlier saves use oldAmounts for a roll already on screen. */
window.DICE_EVENTS = [
  {
    id: "shipping-crisis",
    title: "Shipping Delays",
    text: "Ships are stuck at busy ports, so your stock or supplies may arrive late.",
    oldAmounts: [-10000,-6000,-2500,0,3500,7500],
    outcomes: [
      { text: "You miss orders and pay extra to fly in supplies.", amount: -4500 },
      { text: "Stock arrives late, so you lose several big orders.", amount: -2500 },
      { text: "Some supplies arrive late and cost a little more to ship.", amount: -1000 },
      { text: "You use the stock you already have and earn a little by selling items that are hard to find.", amount: 500, revisedText: { zh: "你用手头的库存继续营业，靠卖紧缺商品赚了一点。", ko: "기존 재고로 버티고 구하기 힘든 상품을 팔아 조금 벌었어요." }, oldText: "You juggle stock and mostly manage to keep going." },
      { text: "A rival runs out of stock and some of their customers buy from you.", amount: 3500 },
      { text: "You stocked up early and keep making sales while rivals run out.", amount: 7500 }
    ]
  },
  {
    id: "viral-trend",
    title: "A Trend Takes Off",
    text: "A video starts a trend that fits what {biz} sells, and lots of people want to buy at once.",
    oldAmounts: [-8000,-3500,-1000,500,4500,9500],
    outcomes: [
      { text: "You take too many orders and spend money on rush supplies and refunds.", amount: -4500 },
      { text: "You fill some orders, but delays send other shoppers elsewhere.", amount: -2500 },
      { text: "The trend passes before you can sell the extra stock you bought.", amount: -1000 },
      { text: "You make enough extra sales to cover the added work, with a little left over.", amount: 500, revisedText: { zh: "多卖出的商品够付额外的开支，还剩了一点。", ko: "추가 판매로 늘어난 비용을 내고도 조금 남았어요." } },
      { text: "A couple of strong weeks bring in plenty of sales and new followers.", amount: 4500 },
      { text: "You sell out and gain lots of customers who come back after the trend ends.", amount: 9500 }
    ]
  },
  {
    id: "recession",
    title: "Shoppers Spend Less",
    text: "Families are watching their budgets, and fewer people are ready to buy from {biz}.",
    oldAmounts: [-11000,-6500,-2500,500,3500,6500],
    outcomes: [
      { text: "Sales drop sharply, and some customers can't pay what they owe.", amount: -4500 },
      { text: "Many customers switch to cheaper products, and you lose sales.", amount: -2500 },
      { text: "Sales slow down, but cutting costs keeps the loss small.", amount: -1000 },
      { text: "Regular customers keep buying, and cheaper supplies leave you a little ahead.", amount: 500, revisedText: { zh: "老顾客继续买，进货成本也降了，你还是赚了一点。", ko: "단골들이 계속 찾아왔고 재료비가 내려 조금 벌었어요." } },
      { text: "Shoppers choose your good-value products over pricier ones.", amount: 3500 },
      { text: "Your affordable products are just what people need, and your sales climb.", amount: 6500 }
    ]
  },
  {
    id: "cyber-attack",
    title: "Hackers Target Local Shops",
    text: "Hackers are targeting small businesses near {biz}, and your shop's accounts and customer details could be at risk.",
    oldAmounts: [-12000,-7500,-2500,-500,2500,6500],
    outcomes: [
      { text: "Your systems are locked for days, and recovery costs you money.", amount: -4500 },
      { text: "Some customer details are stolen, and you pay to fix the problem and tell customers.", amount: -2500 },
      { text: "A fake email fools someone on the team, so you pay to clean up and improve security.", amount: -1000 },
      { text: "You block the attack and fill a small order from a buyer who trusts your shop.", amount: 500, revisedText: { zh: "你挡住了攻击，还接到一位信任你的买家的小订单。", ko: "공격을 막고 가게를 믿어 준 손님의 작은 주문을 받았어요." }, oldText: "Your security stops most of it and costs you only some staff time." },
      { text: "You block the attack, and new buyers hear how you kept customer details safe.", amount: 2500 },
      { text: "A big customer is impressed by your security and places a large order.", amount: 6500 }
    ]
  },
  {
    id: "new-competitor",
    title: "A New Rival Opens Nearby",
    text: "A rival opens close to {biz} and offers opening discounts to pull in shoppers.",
    oldAmounts: [-9000,-5000,-1500,500,3500,7000],
    outcomes: [
      { text: "The rival charges less, and many of your regulars switch.", amount: -4500 },
      { text: "You cut your prices after losing customers in the first month.", amount: -2500 },
      { text: "Some buyers try the rival, so you lose a few sales while you wait for them to come back.", amount: -1000 },
      { text: "Your regulars keep buying, and a few new shoppers try your shop too.", amount: 500, revisedText: { zh: "老顾客继续买，也有几位新顾客来你店里消费。", ko: "단골들은 계속 찾아왔고 새 손님 몇 명도 물건을 샀어요." } },
      { text: "The new shop brings more people to the area, and some buy from you.", amount: 3500 },
      { text: "Shoppers who got poor service at the rival's shop try yours and keep coming back.", amount: 7000 }
    ]
  },
  {
    id: "flood",
    title: "Flash Flood",
    text: "Heavy rain floods streets near {biz}, making it hard for people and supplies to reach you.",
    oldAmounts: [-10000,-6000,-2000,0,3000,6000],
    outcomes: [
      { text: "Water damages stock and equipment, and insurance pays for only part of it.", amount: -4500 },
      { text: "You close for repairs and miss several days of sales.", amount: -2500 },
      { text: "You lose a little on wet stock and a short closure.", amount: -1000 },
      { text: "You keep stock dry and take enough online orders to earn a small profit.", amount: 500, revisedText: { zh: "你把库存保持干燥，靠网店订单赚了一点。", ko: "재고를 물에 젖지 않게 보관하고 온라인 주문으로 조금 벌었어요." }, oldText: "You lose a day or two, but protected stock and online orders balance things." },
      { text: "Customers who can't get out place orders for delivery where roads are open.", amount: 3000 },
      { text: "You help neighbours during the flood, and many come back to buy once streets reopen.", amount: 6000 }
    ]
  },
  {
    id: "government-grant",
    title: "Money for Young Business Owners",
    text: "The government is offering grants, money for young business owners that they usually don't have to pay back.",
    oldAmounts: [-8000,-3500,-500,1000,4500,9000],
    outcomes: [
      { text: "You spend time and money on an application that doesn't win any funding.", amount: -4500 },
      { text: "The application is turned down after taking time away from sales.", amount: -2500 },
      { text: "A small grant comes through and pays more than it cost to apply.", amount: 650, revisedText: { zh: "你拿到一小笔补助，金额超过了申请费用。", ko: "작은 지원금을 받아 신청에 든 비용보다 조금 더 남았어요." }, oldText: "You reach the shortlist but only receive a tiny amount." },
      { text: "Your first grant pays for the application and lets you keep a little extra.", amount: 1000 },
      { text: "A grant gives you some extra money to grow the business.", amount: 4500 },
      { text: "Your application wins a large grant and advice from an experienced business owner.", amount: 9000 }
    ]
  },
  {
    id: "currency-swing",
    title: "The Ringgit Changes Value",
    text: "The value of the ringgit changes quickly, which affects what you pay and earn when you trade with other countries.",
    oldAmounts: [-9000,-5500,-2000,0,4000,7500],
    outcomes: [
      { text: "The ringgit falls sharply, and buying supplies from abroad costs much more.", amount: -4500 },
      { text: "Overseas supplies cost more, and you have to pay most of the increase yourself.", amount: -2500 },
      { text: "A small price rise covers only part of what your supplies now cost.", amount: -1000 },
      { text: "The extra money from overseas sales is slightly more than the rise in supply costs.", amount: 500, revisedText: { zh: "海外订单换回的钱多了一点，超过了进货成本的涨幅。", ko: "해외 판매로 들어온 돈이 늘어 오른 공급 비용을 조금 넘겼어요." }, oldText: "Small swings in both directions roughly cancel out." },
      { text: "Overseas sales are worth more when you change the money into ringgit.", amount: 4000 },
      { text: "A big customer abroad places a large order just as its payment is worth more in ringgit.", amount: 7500 }
    ]
  },
  {
    id: "celebrity-mention",
    title: "A Famous Person Mentions You",
    text: "A well-known local personality mentions {biz} online, and many people hear about your shop for the first time.",
    oldAmounts: [-8000,-3500,-500,1000,5500,10000],
    outcomes: [
      { text: "People turn against the star, and some stop buying from you as well.", amount: -4500 },
      { text: "You can't keep up with orders, and unhappy buyers leave bad reviews.", amount: -2500 },
      { text: "The mention fades quickly, but a few extra orders still earn you a small profit.", amount: 500, revisedText: { zh: "热度很快过去，但多接的几笔订单还是带来了一点利润。", ko: "관심은 금세 식었지만 주문이 몇 건 늘어 작은 이익을 얻었어요." }, oldText: "The attention is brief and you hardly notice it." },
      { text: "A short burst of orders leaves a little extra money after you pay the costs.", amount: 1000 },
      { text: "Strong sales and new followers help more people find your shop.", amount: 5500 },
      { text: "You make lots of sales, and many first-time shoppers become regulars.", amount: 10000 }
    ]
  },
  {
    id: "regulation-change",
    title: "New Rules for Businesses",
    text: "The government sets new rules that {biz} must meet by a certain date.",
    oldAmounts: [-9000,-5500,-2000,500,3500,7000],
    outcomes: [
      { text: "You miss the date, pay a fine and close for a short time to fix things.", amount: -4500 },
      { text: "Changing the way you work costs more than you expected.", amount: -2500 },
      { text: "Forms and a few small changes add to your costs.", amount: -1000 },
      { text: "You already meet most rules, and a buyer who's checking the new rules places an order.", amount: 500, revisedText: { zh: "你已经符合大部分新规定，一位在意这些规定的买家下了单。", ko: "이미 새 규칙을 대부분 지켜서, 기준을 확인하던 손님이 주문했어요." } },
      { text: "Customers choose you after they see that you met the new rules quickly.", amount: 3500 },
      { text: "Some rivals close to make changes, and their customers start buying from you.", amount: 7000 }
    ]
  },
  {
    id: "trade-fair",
    title: "A Local Trade Fair",
    text: "{biz} can book a RM 3,000 stall at a fair where shop owners meet customers and suppliers.",
    oldAmounts: [-8000,-4000,-1500,500,5000,9000],
    outcomes: [
      { text: "Few people pass your stall, so sales don't cover the fee or staff time.", amount: -4500 },
      { text: "Rain keeps shoppers away, and you make less than the stall costs.", amount: -2500 },
      { text: "You meet a few buyers, but their first orders don't cover the stall costs.", amount: -1000 },
      { text: "Stall sales cover your costs and leave a little extra.", amount: 500, revisedText: { zh: "摊位的销售额付清了成本，还剩下一点。", ko: "가판대에서 판 돈으로 비용을 내고도 조금 남았어요." } },
      { text: "Several people who visit your stall become regular customers.", amount: 5000 },
      { text: "A large buyer meets you at the fair and places a big order.", amount: 9000 }
    ]
  },
  {
    id: "competitor-closes",
    title: "A Rival Closes",
    text: "A rival shuts down, so its customers are looking for a new place to buy.",
    oldAmounts: [-8000,-3500,-500,1000,5500,8500],
    outcomes: [
      { text: "You pay for extra stock and staff, but most customers go elsewhere.", amount: -4500 },
      { text: "New orders are hard to handle, and refunds and complaints cost money.", amount: -2500 },
      { text: "A few shoppers try your shop, but you spend more getting ready than they spend.", amount: -500 },
      { text: "A small ad brings enough new customers to leave a little profit.", amount: 1000, revisedText: { zh: "一则小广告带来了几位新顾客，你赚了一点。", ko: "작은 광고로 새 손님이 찾아와 조금 벌었어요." } },
      { text: "Many of the rival's former customers buy from you and keep coming back.", amount: 5500 },
      { text: "You get useful equipment at a good price and gain many regular customers.", amount: 8500 }
    ]
  }
];
