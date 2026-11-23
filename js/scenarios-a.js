window.SCENARIOS = (window.SCENARIOS || []).concat([
  {
    id: 1, role: "team", title: "Shop or Online?",
    text: "A shop costs RM 2,800 a month plus RM 5,000 up front. Selling only online costs RM 400 a month, but people can't see {product} in person. So far, only friends and family say they'll buy.",
    options: [
      { text: "Share a corner of a friend's shop for RM 600 a month", outcome: "neutral", amount: 300, result: "A few shoppers bought from you, so you earned just over the cost of sharing the shop." },
      { text: "Rent the shop so customers can see what you sell", outcome: "loss", amount: -5500, result: "Early sales couldn't cover the rent, and you couldn't use the RM 5,000 tied up in the deposit." },
      { text: "Start online and save the rest of your money", outcome: "gain", amount: 3500, result: "The low monthly cost meant you made a profit even when sales were slow." }
    ],
    lesson: "Fixed costs, like rent, stay the same even when you sell less.",
    hint: {
      en: "Which costs would you still have if you sold nothing?",
      zh: "如果一件商品都卖不出去，你还得付哪些费用？",
      ko: "하나도 팔리지 않아도 내야 할 비용은 무엇인가요？"
    }
  },
  {
    id: 2, role: "marketing", title: "Getting the Word Out",
    text: "{name}, you have RM 3,000 to spread the word. One online star with 90,000 followers wants all RM 3,000 for a post, but most followers live overseas. Five smaller local accounts charge RM 500 each.",
    options: [
      { text: "Pay the online star for one post", outcome: "loss", amount: -3000, result: "The post got plenty of likes but few sales because most followers lived too far away to order." },
      { text: "Pay the five local accounts and give each a different discount code", outcome: "gain", amount: 4000, result: "Local followers could buy from you, and the codes showed which accounts brought in orders." },
      { text: "Spend RM 10 a day on social media ads for a month", outcome: "neutral", amount: 200, result: "The ads brought in enough local sales to cover their cost, with a little money left." }
    ],
    lesson: "Your target market is the group of people most likely to buy from you.",
    hint: {
      en: "How many of the people who see your ad could actually order from you?",
      zh: "看到广告的人当中，有多少真的能向你下单？",
      ko: "광고를 보는 사람 중 실제로 주문할 수 있는 사람은 얼마나 될까요？"
    }
  },
  {
    id: 3, role: "finance", title: "The First Loan",
    text: "{name}, you need RM 10,000 for stock and equipment. A bank will lend it for one year and charge 7% interest. A family friend will lend it for free but wants a say in big decisions. You've already been paid for 40 orders.",
    options: [
      { text: "Take the friend's loan without a written agreement", outcome: "loss", amount: -3000, result: "You lost time and money when the friend started overruling prices and supplier choices." },
      { text: "Take the bank loan and buy enough stock for expected orders", outcome: "gain", amount: 3000, result: "Paid orders helped cover the loan payments, and you kept control of the business." },
      { text: "Start smaller with money your team already has", outcome: "neutral", amount: -300, result: "You avoided debt, but you ran out of stock twice and missed sales." }
    ],
    lesson: "Interest is the extra money you pay for borrowing.",
    hint: {
      en: "What would each loan cost you in money or control, and how sure are those sales?",
      zh: "两种借款各要你付出多少钱或多少决定权？那些销售有多大把握？",
      ko: "각 대출에 돈이나 결정권을 얼마나 내줘야 하며, 예상 판매는 얼마나 확실한가요？"
    }
  },
  {
    id: 4, role: "operations", title: "Choosing a Supplier",
    text: "{name}, you need supplies for about 500 items a month. An overseas seller charges RM 8 each and takes three weeks. About 1 in 10 samples were faulty. A local seller charges RM 11, takes three days and replaces faulty items for free.",
    options: [
      { text: "Buy half from each seller", outcome: "neutral", amount: 400, result: "You had two sources of stock, but you still had to deal with returns from the cheaper seller." },
      { text: "Pay more for the local seller", outcome: "gain", amount: 3200, result: "Fast delivery and fewer refunds saved you more than the extra RM 3 per item cost." },
      { text: "Buy everything from the cheaper overseas seller", outcome: "loss", amount: -4500, result: "Late deliveries and faulty items cost you more than you saved." }
    ],
    lesson: "A supplier is a business that sells you the things you need to make or sell your product.",
    hint: {
      en: "Besides price, what could a late delivery or a faulty item cost you?",
      zh: "除了进货价，送货晚了或商品有问题还可能让你损失什么？",
      ko: "물건이 늦게 오거나 불량이면 가격 외에 어떤 비용이 생길까요？"
    }
  },
  {
    id: 5, role: "hr", title: "Hiring Your First Worker",
    text: "{name}, the team can't keep up on weekends. A worker with experience costs RM 1,500 a month. A friend will help for RM 600, and some classmates offer to help for free when they can.",
    options: [
      { text: "Use classmates who can help for free", outcome: "loss", amount: -2500, result: "Missed shifts and order mistakes cost more in lost sales than paying a worker would have." },
      { text: "Hire your friend for RM 600 and train them", outcome: "neutral", amount: 200, result: "You saved on pay, but training took time away from serving customers." },
      { text: "Hire the experienced worker and ask them to train the team", outcome: "gain", amount: 3500, result: "The worker kept queues moving, so extra sales soon covered their pay." }
    ],
    lesson: "Pay matters, and so do the time and mistakes that training may cost.",
    hint: {
      en: "What could happen to sales if the team needs help during the busiest hour?",
      zh: "最忙的时候如果人手不够，销售会受到什么影响？",
      ko: "가장 바쁜 시간에 일손이 부족하면 판매에 어떤 영향이 있을까요？"
    }
  },
  {
    id: 6, role: "sales", title: "A Big Order That Pays Later",
    text: "{name}, a company wants RM 12,000 worth of {product}, but it wants to pay in 60 days. Materials cost RM 7,500 now, and you only have RM 5,000 in the bank.",
    options: [
      { text: "Say yes and let the company pay in 60 days", outcome: "loss", amount: -6000, result: "You had to borrow for materials and ran short of cash when the customer paid late." },
      { text: "Ask for half now and the rest within 30 days", outcome: "gain", amount: 3500, result: "The first payment and your cash covered materials, and the customer paid the rest on time." },
      { text: "Turn down the order and wait for smaller orders paid at once", outcome: "neutral", amount: 0, result: "You kept your cash safe, but the company ordered from someone else." }
    ],
    lesson: "Cash flow is money moving into and out of a business.",
    hint: {
      en: "How much cash would you have on the day you need to buy materials?",
      zh: "到买材料那天，你手上会有多少钱？",
      ko: "재료를 사야 하는 날 손에 얼마가 있을까요？"
    }
  },
  {
    id: 7, role: "tech", title: "Building an Online Shop",
    text: "{name}, you need to take orders online. A web company offers a custom site for RM 6,000 in eight weeks. A ready-made shop costs RM 60 a month and can open this week. You could also take orders in messages.",
    options: [
      { text: "Pay for the custom website", outcome: "loss", amount: -5000, result: "The site looked good, but it opened late and early sales couldn't cover the cost." },
      { text: "Start with the ready-made online shop", outcome: "gain", amount: 4000, result: "You could take orders within days, and early sales helped pay for later upgrades." },
      { text: "Take orders in messages and use bank transfers", outcome: "neutral", amount: 400, result: "You saved on setup, but replying to every order took time and some buyers gave up." }
    ],
    lesson: "Add up what a tool will cost and what it will help you earn or save.",
    hint: {
      en: "What do you need the site to do this week, and what can wait?",
      zh: "网站这周必须能做什么？哪些功能可以以后再加？",
      ko: "이번 주에 사이트에 꼭 필요한 기능은 무엇이고, 어떤 기능은 기다려도 될까요？"
    }
  },
  {
    id: 8, role: "ceo", title: "Advice for a Share of the Business",
    text: "{name}, a retired business owner offers advice and can introduce you to people who buy in bulk. In return, she wants to own 10% of {biz}. The school also has a free adviser.",
    options: [
      { text: "Ask the free school adviser for help", outcome: "neutral", amount: 300, result: "You got useful advice and kept the business, but the adviser knew few buyers." },
      { text: "Give the retired owner 10% of the business", outcome: "loss", amount: -5000, result: "She brought in one new buyer and still owned part of the business after she got busy." },
      { text: "Offer RM 1,000 a month for three months with clear goals", outcome: "gain", amount: 6000, result: "She introduced two bulk buyers, and your team kept full ownership." }
    ],
    lesson: "An ownership share gives someone a continuing stake in the business.",
    hint: {
      en: "How long would each deal last, and what would you give up?",
      zh: "每种安排会持续多久？你要拿什么来交换？",
      ko: "각 제안은 얼마나 오래가고, 그 대가로 무엇을 내주나요？"
    }
  },
  {
    id: 9, role: "team", title: "Three Stalls, One Weekend",
    text: "Three events happen on the same weekend: a big fair (RM 1,200 and about 3,000 visitors), a school open day (RM 150) and a night market (RM 400). You have four teammates and enough stock for one big event.",
    options: [
      { text: "Take the whole team and all your stock to the big fair", outcome: "gain", amount: 6000, result: "The team kept the queue moving and sold all your stock at the fair." },
      { text: "Sell only at the school open day", outcome: "neutral", amount: 300, result: "The open day had fewer shoppers, but sales covered the low stall fee." },
      { text: "Book all three stalls and split up the team", outcome: "loss", amount: -3500, result: "Some stalls ran out of stock or helpers, so sales couldn't cover all three fees." }
    ],
    lesson: "A business can take on more work than its people or stock can handle.",
    hint: {
      en: "How many busy stalls could four people run well at the same time?",
      zh: "四个人同时能把几个忙碌的摊位照顾好？",
      ko: "네 사람이 동시에 바쁜 가판대를 몇 곳이나 제대로 운영할 수 있을까요？"
    }
  },
  {
    id: 10, role: "finance", title: "Setting Your First Price",
    text: "{name}, each item costs RM 6 to make. You also pay RM 1,200 each month in bills that stay the same. Other sellers charge about RM 10 for similar items.",
    options: [
      { text: "Charge RM 7 so buyers get the lowest price", outcome: "loss", amount: -3000, result: "You sold more, but RM 1 per item was too little to cover the monthly bills." },
      { text: "Charge RM 15 to earn more from each sale", outcome: "neutral", amount: -300, result: "Each sale brought in more, but too few customers paid the higher price to cover all your costs." },
      { text: "Charge RM 10 and focus on making a good product", outcome: "gain", amount: 3000, result: "At RM 4 per item after making costs, you covered the monthly bills once you sold 300." }
    ],
    lesson: "Breaking even means earning just enough to cover all your costs.",
    hint: {
      en: "Subtract RM 6 from each price, then think about how many people would pay that price.",
      zh: "先用每个售价减去 RM 6，再想想有多少人愿意付这个价。",
      ko: "각 가격에서 RM 6을 뺀 뒤, 그 가격에 살 사람이 얼마나 될지 생각해 보세요."
    }
  },
  {
    id: 11, role: "marketing", title: "Choosing a Logo",
    text: "{name}, you need a logo. A free image looks a lot like a famous brand's logo. A designer charges RM 1,800 to make a new one. You could also use the business name in plain text for free.",
    options: [
      { text: "Pay a designer to make an original logo", outcome: "gain", amount: 3000, result: "Customers remembered your new logo, and you had the right to use it on everything you sold." },
      { text: "Use the free picture that looks like the famous logo", outcome: "loss", amount: -2500, result: "The brand complained, so you had to replace the logo and pay to reprint your products." },
      { text: "Use the business name in plain text", outcome: "neutral", amount: 0, result: "You saved money, but customers found the simple logo easy to forget." }
    ],
    lesson: "A trade mark can protect a brand's name or logo from being copied.",
    hint: {
      en: "What could you have to pay for if you were told to stop using the logo?",
      zh: "如果别人要求你停用这个标志，你可能得花钱重做什么？",
      ko: "로고를 더는 쓰지 말라는 요구를 받으면 무엇을 다시 만드는 데 돈이 들까요？"
    }
  },
  {
    id: 12, role: "operations", title: "Stock for Hari Raya",
    text: "{name}, Hari Raya is six weeks away. You usually sell 250 items a month and already have 300 orders for the festival. Sales at past festivals were two to three times normal. Delivery takes three weeks, and leftover stock can't be returned.",
    options: [
      { text: "Order 400 items to keep leftovers low", outcome: "neutral", amount: 300, result: "You had little waste, but you sold out early and missed the busiest days." },
      { text: "Order 800 items based on sales and early orders", outcome: "gain", amount: 4500, result: "Early orders took much of the stock, and festival shoppers bought most of the rest." },
      { text: "Order 1,500 items for a big discount", outcome: "loss", amount: -5000, result: "The bulk discount saved less than you lost on the hundreds of items left over." }
    ],
    lesson: "Use past sales and orders placed ahead of time to work out how much stock to buy.",
    hint: {
      en: "What do the past sales tell you, and how long would it take to order more?",
      zh: "过去的销售量告诉你什么？补货又要多久？",
      ko: "지난 판매량은 무엇을 알려 주고, 다시 주문하면 얼마나 걸릴까요？"
    }
  },
  {
    id: 13, role: "sales", title: "A Cheaper Rival",
    text: "{name}, a new seller charges 30% less for a similar product. Customers ask if you'll match the price. Right now you keep about 35% of each sale as profit, so a big price cut would leave very little.",
    options: [
      { text: "Match the rival's price now", outcome: "loss", amount: -4000, result: "You kept some buyers, but each sale earned very little after the price cut." },
      { text: "Keep your price, start a loyalty card and promote your service", outcome: "gain", amount: 3500, result: "Customers who liked your service stayed, so you kept more of the money from each sale." },
      { text: "Keep selling as before", outcome: "neutral", amount: -200, result: "Most customers stayed, though some left and the business missed a chance to win them back." }
    ],
    lesson: "Customer loyalty is when people keep coming back to the same business.",
    hint: {
      en: "Besides price, what might make someone choose your product again?",
      zh: "除了价格，还有什么会让顾客再次选择你的商品？",
      ko: "가격 말고도 다시 찾아오게 만드는 것은 무엇일까요？"
    }
  },
  {
    id: 14, role: "hr", title: "A Disagreement About Pay",
    text: "{name}, two founders say another teammate does less work but gets the same pay. That teammate says exams and family needs leave little time. People are starting to argue in the group chat.",
    options: [
      { text: "Keep pay equal so nobody has to argue about it", outcome: "neutral", amount: 0, result: "The argument went quiet, but teammates who did more work still felt it was unfair." },
      { text: "Pay each person only for their hours and sales", outcome: "loss", amount: -3500, result: "People competed for credit and stopped sharing sales leads, so the team did less together." },
      { text: "Agree on clear jobs, fair goals and a shared bonus", outcome: "gain", amount: 3000, result: "The new plan helped everyone do their part and get more work done as a team." }
    ],
    lesson: "Agree on what fair work and fair pay look like before a disagreement grows.",
    hint: {
      en: "How could you make jobs fair for people who have different amounts of time?",
      zh: "每个人能投入的时间不同，怎样分工才公平？",
      ko: "쓸 수 있는 시간이 서로 다르다면 어떻게 일을 공평하게 나눌 수 있을까요？"
    }
  },
  {
    id: 15, role: "tech", title: "Where to Post Online",
    text: "{name}, your team has time to run one social media account well. Out of 20 customers, 14 use short-video apps daily, five use photo apps and one uses group chats.",
    options: [
      { text: "Post on all three kinds of app", outcome: "loss", amount: -2500, result: "The team rushed its posts across three apps, and few people followed any account." },
      { text: "Make regular short videos", outcome: "gain", amount: 5000, result: "You posted where most customers spent time, and some viewers became regular buyers." },
      { text: "Use a group chat and ask people to tell friends", outcome: "neutral", amount: 300, result: "Messages cost little, but they reached too few people to grow sales much." }
    ],
    lesson: "Market research means finding out what customers do, want or need.",
    hint: {
      en: "Which choice makes the best use of the survey and your team's time?",
      zh: "哪种做法能最好地利用调查结果和团队的时间？",
      ko: "설문 결과와 팀의 시간을 가장 잘 활용하는 방법은 무엇일까요？"
    }
  },
  {
    id: 16, role: "team", title: "What to Do With Your First Profit",
    text: "{biz} has RM 6,000 left after paying its costs. Everyone would like a reward, but your best-selling item has run out twice. You could use the money for stock, equipment or pay.",
    options: [
      { text: "Share all RM 6,000 with the team", outcome: "neutral", amount: -200, result: "The team liked the reward, but you missed sales because there was no money to buy more stock." },
      { text: "Spend it all on new products and bigger equipment", outcome: "loss", amount: -4000, result: "New products sold slowly, and you couldn't buy more of your best-seller." },
      { text: "Buy more of your best-seller, save some cash and pay a small bonus", outcome: "gain", amount: 4000, result: "The popular item sold again, the saved cash covered a slow week and the team got a reward." }
    ],
    lesson: "You can keep some profit in the business to pay for future costs and growth.",
    hint: {
      en: "Which use of the money has the strongest evidence that it will help sales?",
      zh: "哪种花法最有证据能带来销售？",
      ko: "돈을 어디에 쓰면 판매에 도움이 될지 가장 확실한 근거가 있나요？"
    }
  },
  {
    id: 17, role: "ceo", title: "The Delivery App Deal",
    text: "{name}, a delivery app reaches thousands of local users and keeps 30% of each sale. It will take just 22% if you agree to sell only through the app for the next year.",
    options: [
      { text: "Sell only through the app for a 22% fee", outcome: "loss", amount: -5500, result: "The app changed its fees, and you had no other place to sell under the deal." },
      { text: "Keep selling the way you do now", outcome: "neutral", amount: -200, result: "You kept control and avoided the app fee, but you missed a chance to reach new customers." },
      { text: "Join the app at 30%, set higher prices there and keep selling elsewhere", outcome: "gain", amount: 4000, result: "The app brought new buyers, and the higher app price covered its fee while your other sales continued." }
    ],
    lesson: "A commission is a cut of each sale paid to the app or person who helped make the sale.",
    hint: {
      en: "What would happen if the app changed its rules while it was your only way to sell?",
      zh: "如果你只能在这个平台卖东西，而它改了规则，会怎样？",
      ko: "앱이 유일한 판매 통로인데 규칙을 바꾸면 어떻게 될까요？"
    }
  },
  {
    id: 18, role: "finance", title: "Permission and Insurance",
    text: "{name}, a mall will let you open a two-week stall if you have a business licence and insurance for claims if someone gets hurt. The licence and basic cover cost RM 800 a year. Extra cover costs RM 2,400.",
    options: [
      { text: "Open without the licence or insurance to save cash", outcome: "loss", amount: -6000, result: "The mall ended the booking, and you paid a customer's injury claim yourself." },
      { text: "Get the licence and pay RM 2,400 for the extra cover", outcome: "neutral", amount: -300, result: "You had protection, but the extra cover used up much of the money the stall earned." },
      { text: "Get the licence and basic cover, then open the stall", outcome: "gain", amount: 2500, result: "The stall earned money, and the basic insurance helped pay a small claim." }
    ],
    lesson: "A licence gives you permission to operate, and insurance can help pay certain costs after an accident.",
    hint: {
      en: "What does the mall require, and which extra protection would the stall really use?",
      zh: "商场有什么要求？这个摊位真的用得上哪些额外保障？",
      ko: "쇼핑몰은 무엇을 요구하고, 가판대에는 어떤 추가 보장이 정말 필요할까요？"
    }
  },
  {
    id: 19, role: "operations", title: "Picking the Packaging",
    text: "{name}, you're sending 1,000 items. Each package costs RM 0.80 for a plain bag, RM 2.50 for a greener pack or RM 4 for a gift box. Some families and schools prefer greener packs, and big boxes cost more to post.",
    options: [
      { text: "Use fancy gift boxes for every order", outcome: "loss", amount: -3500, result: "Most buyers liked the boxes but wouldn't pay extra for the boxes or the higher postage." },
      { text: "Use greener packaging and tell buyers about it", outcome: "gain", amount: 4500, result: "Families and schools shared pictures and ordered again, making up for the extra cost." },
      { text: "Use the cheapest plain bags", outcome: "neutral", amount: 200, result: "Orders arrived safely and cheaply, but the bags gave buyers little reason to choose you again." }
    ],
    lesson: "Packaging adds a cost and can also give customers a reason to buy.",
    hint: {
      en: "Which packaging features do customers seem to value, and what do they cost per order?",
      zh: "顾客重视包装的哪些特点？每单要多花多少钱？",
      ko: "고객이 좋아할 포장의 특징은 무엇이고 주문당 얼마가 들까요？"
    }
  },
  {
    id: 20, role: "marketing", title: "Giving Out Free Samples",
    text: "{name}, a regular buyer spends about RM 40 a year on {product}. A sample costs RM 1.50. You can hand out 100 samples, hand out 500 with a scan code, or run a half-price sale.",
    options: [
      { text: "Sell everything at half price for a week", outcome: "loss", amount: -3000, result: "Many people bought once for the low price and left when the sale ended." },
      { text: "Give 100 samples to friends and classmates", outcome: "neutral", amount: 400, result: "A few people came back to buy, and their orders just covered the small cost." },
      { text: "Give 500 samples with a code that counts later orders", outcome: "gain", amount: 5500, result: "About one in eight people who got a sample came back to buy, easily covering the cost." }
    ],
    lesson: "A promotion works better when it brings in customers who come back.",
    hint: {
      en: "How many people would need to buy again for the cost of samples to pay off?",
      zh: "要有多少人回来购买，样品的花费才值得？",
      ko: "샘플 비용을 만회하려면 몇 명이 다시 사야 할까요？"
    }
  },
  {
    id: 21, role: "hr", title: "Exams and a Big Order",
    text: "{name}, exams start in two weeks, and a RM 6,000 order is due the week before. The team is tired and still needs time to study.",
    options: [
      { text: "Work late every night to finish the order", outcome: "loss", amount: -4500, result: "The tired team made mistakes that cost time to fix, and some people fell behind on studying." },
      { text: "Turn down the order so everyone can study", outcome: "neutral", amount: -400, result: "Everyone got time to study, but you lost the order and a possible regular customer." },
      { text: "Ask to deliver in two parts and pay for short-term help", outcome: "gain", amount: 3000, result: "Splitting the delivery and hiring help gave the team time to finish the work and study." }
    ],
    lesson: "A plan should allow time for the work and for the people doing it.",
    hint: {
      en: "Could you change the amount due on the first day without losing the whole order?",
      zh: "不丢掉整笔订单的情况下，能不能改第一天要交的数量？",
      ko: "주문 전체를 잃지 않으면서 첫날 납품할 양을 바꿀 수 있을까요？"
    }
  },
  {
    id: 22, role: "sales", title: "The Canteen Wants 25% Off",
    text: "{name}, a school canteen wants 500 items at 25% off your usual RM 10 price. Each costs RM 5.50 to make. Your team has time to fill the order this month.",
    options: [
      { text: "Offer 10% off and hold at that price", outcome: "loss", amount: -2000, result: "The canteen bought somewhere else, and the supplies you had ordered sat unused." },
      { text: "Accept 25% off at a price of RM 7.50 per item", outcome: "gain", amount: 3000, result: "You made RM 2 per item, used spare time and won a monthly order." },
      { text: "Offer free delivery and keep the usual price", outcome: "neutral", amount: 0, result: "The canteen wanted a lower price and turned down free delivery." }
    ],
    lesson: "A discount can still earn money if the new price is higher than the extra cost to fill the order.",
    hint: {
      en: "Take 25% off RM 10, then subtract what one item costs to make.",
      zh: "先算 RM 10 打七五折后是多少，再减去做一件商品的成本。",
      ko: "RM 10에서 25%를 깎고, 물건 한 개를 만드는 비용을 빼 보세요."
    }
  },
  {
    id: 23, role: "tech", title: "One Shared Password",
    text: "{name}, everyone uses one password for the shop and email accounts. Last week someone sent the team a fake message asking them to log in. The shop stores customers' names and addresses.",
    options: [
      { text: "Keep the shared password so everyone can log in quickly", outcome: "loss", amount: -6000, result: "A fake login page fooled a teammate, and the stolen password gave someone access to customer details." },
      { text: "Buy a RM 1,500 security package and keep the same logins", outcome: "neutral", amount: -400, result: "The package helped a little, but sharing passwords still left the team with the same problem." },
      { text: "Give each person a login and add a second check when signing in", outcome: "gain", amount: 2500, result: "A stolen password alone couldn't open the account, and a school noticed your stronger security." }
    ],
    lesson: "Two-step sign-in asks for another check, such as a code, after you enter a password.",
    hint: {
      en: "If one team password is stolen, what could someone get to with it?",
      zh: "如果团队的一个密码被偷，别人能用它看到什么？",
      ko: "팀 비밀번호 하나가 도난당하면 누군가 어디까지 접근할 수 있을까요？"
    }
  },
  {
    id: 24, role: "ceo", title: "The Bad Review",
    text: "{name}, a customer gives {biz} one star for a late delivery and a damaged item. Your records show it was a day late and the damage looks real. Other people are reading the comments.",
    options: [
      { text: "Post your records to argue that the review goes too far", outcome: "neutral", amount: -200, result: "The records were right, but your reply sounded like an argument and kept the complaints going." },
      { text: "Offer a refund privately if the customer removes the review", outcome: "loss", amount: -2500, result: "The customer shared your message, and readers felt you were pressuring them." },
      { text: "Say sorry publicly, refund and replace the item, and explain the fix", outcome: "gain", amount: 3000, result: "The customer praised your response, and other readers saw that you could put mistakes right." }
    ],
    lesson: "Good customer service means taking problems seriously and fixing what you can.",
    hint: {
      en: "What would someone reading your reply want to know before trusting your shop?",
      zh: "看到回复的人想知道什么，才会信任你的店？",
      ko: "답글을 보는 사람이 가게를 믿으려면 무엇을 알고 싶을까요？"
    }
  },
  {
    id: 25, role: "team", title: "A Stall for Chinese New Year",
    text: "A mall offers two weeks of stall space. The busy spot costs RM 5,000 and sees 6,000 people a day. The quiet spot costs RM 1,500 and sees 800. In the past, 1 in 100 visitors bought something and left you about RM 12 after product costs.",
    options: [
      { text: "Book just weekends at the busy spot", outcome: "neutral", amount: 400, result: "Weekend sales were good, but the short booking meant they only just covered the fee." },
      { text: "Book the quiet spot for two weeks", outcome: "loss", amount: -2500, result: "Too few visitors bought anything to cover even the lower fee and staff time." },
      { text: "Book the busy spot for two weeks", outcome: "gain", amount: 5000, result: "About 60 sales a day earned enough to pay the higher fee and leave a profit." }
    ],
    lesson: "How many people pass a stall matters only if some of them stop and buy.",
    hint: {
      en: "If 1 in 100 people buys, how many sales can each spot make in a day?",
      zh: "如果每 100 人有 1 人买，每个地点一天能卖出多少？",
      ko: "100명 중 한 명이 산다면 각 자리에서 하루에 얼마나 팔 수 있을까요？"
    }
  }
]);
