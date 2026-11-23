window.SCENARIOS = (window.SCENARIOS || []).concat([
  {
    id: 26, role: "ceo", title: "An Investor Makes an Offer",
    text: "An investor offers RM 150,000 to own 30% of {biz}. Your business makes about RM 120,000 a year in profit and needs RM 60,000 to grow. A bank will lend RM 60,000 and charge about RM 4,200 in interest for a year.",
    options: [
      { text: "Take RM 150,000 and give the investor 30% of the business", outcome: "loss", amount: -9000, result: "You spent some of the extra cash on projects that failed, and the investor kept a share of future profits." },
      { text: "Borrow the RM 60,000 from the bank", outcome: "gain", amount: 7000, result: "The bank's interest cost less than sharing profits with the investor, and your team kept control." },
      { text: "Turn down both offers and save up from your own profits", outcome: "neutral", amount: -200, result: "You owed nobody, but growth was slower and a rival won some customers." }
    ],
    lesson: "An investor may give you money now in exchange for owning part of the business.",
    hint: {
      en: "What is 30% of one year's profit, and how does that compare with the yearly interest?",
      zh: "一年利润的 30% 是多少？和一年的利息相比呢？",
      ko: "1년 이익의 30%는 얼마이고, 1년 이자와 비교하면 어떤가요？"
    }
  },
  {
    id: 27, role: "finance", title: "Buy or Rent the Equipment?",
    text: "{name}, a machine costs RM 40,000 to buy or RM 1,300 a month to rent for three years (RM 46,800 total). It may be out of date in three years. You have RM 55,000 saved.",
    options: [
      { text: "Buy a used machine for RM 22,000", outcome: "neutral", amount: 300, result: "Repair bills ate up much of what you saved on the used machine." },
      { text: "Buy the new machine for RM 40,000", outcome: "loss", amount: -3500, result: "Buying left too little cash for a surprise bill, so you had to borrow at a high cost." },
      { text: "Rent the machine for three years", outcome: "gain", amount: 3000, result: "Renting left cash for a surprise bill and let you change to a newer model later." }
    ],
    lesson: "Renting equipment can cost more over time but leave more cash available now.",
    hint: {
      en: "How much cash would each choice leave for a surprise bill or a better machine?",
      zh: "每种选择能留下多少钱来付意外账单或换更好的机器？",
      ko: "각 선택 후 갑작스러운 지출이나 새 기계에 쓸 돈이 얼마나 남을까요？"
    }
  },
  {
    id: 28, role: "team", title: "Let Others Open Your Shops?",
    text: "Three people in different towns each offer RM 30,000 and 6% of sales to run a shop under your brand. This is called a franchise. You have a guide and a team that can check their work. A rival plans to open in two of those towns soon.",
    options: [
      { text: "Try one franchise now and wait a year before adding more", outcome: "loss", amount: -4500, result: "The first shop ran well, but the rival got to the other towns while you waited." },
      { text: "Open all three franchises now and check them regularly", outcome: "gain", amount: 8500, result: "Your guide and checks kept quality steady, and the new shops earned fees and a share of sales." },
      { text: "Open only shops that your own team runs", outcome: "neutral", amount: 0, result: "You kept control, but opening the shops yourself took more time and money." }
    ],
    lesson: "A franchise lets someone else use your brand and business plan for a fee.",
    hint: {
      en: "What can you use to keep quality the same if three new people run shops under your name?",
      zh: "三个人各开一家挂你招牌的店，你能怎样保证质量一致？",
      ko: "세 명이 같은 이름으로 가게를 열면 품질을 어떻게 일정하게 유지할 수 있을까요？"
    }
  },
  {
    id: 29, role: "marketing", title: "A Famous Creator Offers to Help",
    text: "{name}, a creator with 800,000 followers wants RM 15,000 to promote {product}. Only about 20% of their followers live in Malaysia. Your survey shows 85% of your customers are local teenagers.",
    options: [
      { text: "Pay RM 15,000 for the famous creator to promote your product", outcome: "loss", amount: -5000, result: "Lots of people saw the post, but few lived close enough to buy and sales didn't cover the fee." },
      { text: "Spend RM 3,000 on ads aimed at local teenagers", outcome: "neutral", amount: 300, result: "The ads reached the right age group and earned a little more than they cost." },
      { text: "Pay several local creators RM 2,500 each to reach their followers", outcome: "gain", amount: 4000, result: "More viewers lived nearby and trusted the local creators, so enough people bought to cover the fees." }
    ],
    lesson: "The best audience for an ad is the one most likely to buy.",
    hint: {
      en: "Which of the followers are most like your current customers?",
      zh: "哪些粉丝最像你现在的顾客？",
      ko: "어느 팔로워가 지금의 고객과 가장 비슷한가요？"
    }
  },
  {
    id: 30, role: "operations", title: "Your Supplier Raises Prices",
    text: "{name}, your usual supplier will raise its prices by 20%, adding RM 2,000 to your monthly bill of RM 10,000. A new supplier is 8% cheaper than your old price, but delivery takes six weeks instead of one and you haven't tried them.",
    options: [
      { text: "Move all your orders to the new supplier", outcome: "loss", amount: -5000, result: "A long wait left you out of stock, and rush orders cost more than the lower price saved." },
      { text: "Keep 70% of your orders with the old supplier and try 30% with the new one", outcome: "neutral", amount: 200, result: "You learned about the new supplier but still paid higher prices on most stock." },
      { text: "Show your usual supplier the other price and ask for a better deal", outcome: "gain", amount: 3500, result: "Your usual supplier wanted to keep your orders and lowered the rise to 6%." }
    ],
    lesson: "Comparing offers can give you a better deal without changing suppliers.",
    hint: {
      en: "What could make the old supplier want to keep your business?",
      zh: "什么会让原来的供应商想留住你这个客户？",
      ko: "기존 공급업체는 왜 당신의 주문을 계속 받고 싶을까요？"
    }
  },
  {
    id: 31, role: "hr", title: "Staff Ask for a Pay Rise",
    text: "{name}, your 12 workers ask for 10% more pay, costing RM 21,600 a year. Each time someone leaves, hiring and training a replacement costs about RM 9,000. Three workers say they may leave without a rise.",
    options: [
      { text: "Offer workers a share of profits instead of a pay rise", outcome: "loss", amount: -3500, result: "The bonus was small in a slow month, and you had to pay to replace two workers who left." },
      { text: "Give all staff the 10% pay rise", outcome: "gain", amount: 3500, result: "The rise cost less than replacing three workers, and the team stayed together." },
      { text: "Raise pay by 5% and check again next year", outcome: "neutral", amount: -300, result: "You spent less on the rise, but one worker still left and needed replacing." }
    ],
    lesson: "Keeping trained staff can cost less than hiring and training new people.",
    hint: {
      en: "Compare the cost of the pay rise with the cost of replacing three people.",
      zh: "比较一下加薪和更换三名员工分别要花多少钱。",
      ko: "임금을 올리는 비용과 세 사람을 새로 뽑는 비용을 비교해 보세요."
    }
  },
  {
    id: 32, role: "sales", title: "The Big Contract",
    text: "A company offers RM 120,000 of work over a year. It wants 15% off and would pay 90 days after each delivery. The work would fill 60% of your team's time. For a 3% fee, the bank can pay you 80% of each bill early.",
    options: [
      { text: "Ask for a smaller discount and payment in 45 days", outcome: "loss", amount: -3500, result: "The buyer chose someone else after you had already turned down regular orders to make time." },
      { text: "Take the deal and ask the bank for an advance on each bill", outcome: "gain", amount: 8000, result: "Getting most of each payment early kept enough cash on hand to fill the orders despite the fee." },
      { text: "Turn down the deal and keep serving regular customers", outcome: "neutral", amount: 0, result: "Your regular sales and cash stayed steady, but the business missed a big chance to grow." }
    ],
    lesson: "Invoice financing means getting part of a customer's payment early from a bank for a fee.",
    hint: {
      en: "Which bills come due before the customer pays, and how could you cover them?",
      zh: "顾客付款前有哪些账单要先付？你怎样付得起？",
      ko: "고객이 돈을 내기 전에 어떤 비용을 내야 하며, 어떻게 감당할 수 있을까요？"
    }
  },
  {
    id: 33, role: "tech", title: "Customer Details Were Stolen",
    text: "{name}, someone broke into a system holding 2,000 customers' names and emails. No payment details were taken, but you can't tell exactly whose information was seen.",
    options: [
      { text: "Tell only the 400 customers you think were affected", outcome: "neutral", amount: -200, result: "Some customers found out from friends and were upset that you hadn't told them." },
      { text: "Wait a month to speak until you know what happened", outcome: "loss", amount: -7000, result: "The news got out first, customers lost trust and the business was fined for telling them late." },
      { text: "Tell all 2,000 customers within 48 hours and ask them to change their passwords", outcome: "gain", amount: 2000, result: "The early warning gave customers time to protect their accounts and helped keep their trust." }
    ],
    lesson: "A data breach happens when someone gets access to private information without permission.",
    hint: {
      en: "What could customers do with an early warning that they might miss if you wait?",
      zh: "如果早点收到提醒，顾客能及时做些什么？",
      ko: "고객이 일찍 알면 기다렸을 때 놓칠 수 있는 어떤 조치를 할 수 있을까요？"
    }
  },
  {
    id: 34, role: "team", title: "Buying a Rival Business",
    text: "A rival with 3,000 customers wants RM 80,000 for its business. It owes RM 30,000 and runs things differently from you. You could offer RM 35,000 for its brand and customer list, with permission to contact those customers.",
    options: [
      { text: "Offer RM 35,000 for the brand and customer list", outcome: "gain", amount: 6000, result: "Keeping the brand helped customers stay, and you avoided the rest of the company's debts." },
      { text: "Hire the rival's two best workers and leave the deal", outcome: "neutral", amount: 200, result: "The two workers helped your team, but the rival's customers went elsewhere." },
      { text: "Pay RM 80,000 for the whole company", outcome: "loss", amount: -7000, result: "Debts and different ways of working added costs, and many customers left when the brand disappeared." }
    ],
    lesson: "When you buy a business, find out what you get and what debts you may take on.",
    hint: {
      en: "Which parts of the rival's business do you need, and what costs come with each deal?",
      zh: "对手的生意哪些部分对你有用？每种买法有什么成本？",
      ko: "경쟁사에서 필요한 부분은 무엇이며, 각 선택에는 어떤 비용이 있나요？"
    }
  },
  {
    id: 35, role: "finance", title: "When Money Changes Value",
    text: "{name}, you must pay a supplier in Singapore dollars in three months. It would cost RM 60,000 today. The ringgit has already lost 6% of its value against the Singapore dollar this month, and your expected profit on the order is only 8%.",
    options: [
      { text: "Pay in three months at whatever the rate is then", outcome: "loss", amount: -4000, result: "When the ringgit fell again, you paid RM 2,400 more than expected and lost much of the profit." },
      { text: "Pay half now and half in three months", outcome: "neutral", amount: -200, result: "Paying early protected half the order, but the rest cost more when the ringgit fell." },
      { text: "Pay a RM 600 fee to lock in today's exchange rate", outcome: "gain", amount: 2500, result: "You paid the fee, but the falling ringgit couldn't raise the price of the order." }
    ],
    lesson: "The exchange rate tells you how much one country's money buys in another country's money.",
    hint: {
      en: "If the ringgit falls again, which costs would change, and which would stay fixed?",
      zh: "如果令吉再次贬值，哪些费用会变，哪些不会变？",
      ko: "링깃 가치가 다시 떨어지면 어떤 비용이 바뀌고, 어떤 비용은 그대로일까요？"
    }
  },
  {
    id: 36, role: "ceo", title: "An Employee Speaks Up",
    text: "{name}, a worker says your top salesperson tells buyers {product} passed a test it never took. The salesperson brings in about RM 5,000 in extra sales a month. The worker is afraid of being punished for speaking up.",
    options: [
      { text: "Check the claim and warn the salesperson in private", outcome: "neutral", amount: -300, result: "The false claims stopped, but the worker who spoke up felt unsafe and left." },
      { text: "Tell the salesperson to stop and move on", outcome: "loss", amount: -8000, result: "Another complaint brought a formal investigation, and customers lost trust when the story came out." },
      { text: "Check what happened, tell customers the truth and protect the worker", outcome: "gain", amount: 3000, result: "Sales fell at first, but your honest response later helped win a new contract." }
    ],
    lesson: "Workers should be able to report problems safely so the business can put them right.",
    hint: {
      en: "Who could be hurt by the false claim, and what would make it safer to speak up?",
      zh: "假话会伤害谁？怎样让员工更安心地说出来？",
      ko: "거짓말로 누가 피해를 볼 수 있고, 직원이 어떻게 하면 안전하게 말할 수 있을까요？"
    }
  },
  {
    id: 37, role: "marketing", title: "A Complaint Goes Viral",
    text: "{name}, 60,000 people have seen an angry post about {biz}. An order was late and a team member was rude, but the customer got some details wrong. People are watching how you reply.",
    options: [
      { text: "Reply quickly, say sorry for the real mistakes and offer a refund", outcome: "gain", amount: 4500, result: "Readers saw that you took the problem seriously, and some went on to buy from you." },
      { text: "Post proof for every detail the customer got wrong", outcome: "loss", amount: -4000, result: "The reply sounded like an argument, and screenshots spread even further than the original post." },
      { text: "Speak to the customer privately and leave the post unanswered", outcome: "neutral", amount: -300, result: "The story faded, but some people saw the unanswered post and wondered whether you cared." }
    ],
    lesson: "A public reply shows future customers how you handle mistakes.",
    hint: {
      en: "What would reassure someone who sees the post and has never bought from you?",
      zh: "从没买过你东西的人看到帖子后，什么能让他们放心？",
      ko: "처음 그 글을 보는 새 고객을 어떻게 안심시킬 수 있을까요？"
    }
  },
  {
    id: 38, role: "hr", title: "A Rival Wants Your Best Worker",
    text: "A rival offers your best worker RM 6,500 a month, up from RM 4,500. She runs much of the daily work at {biz} and wants a chance to learn and take on more responsibility.",
    options: [
      { text: "Match the rival's offer of RM 6,500 right away", outcome: "loss", amount: -3500, result: "Other staff asked for raises too, and the worker still saw no chance to grow." },
      { text: "Offer RM 5,200, a bigger role and training, and train a backup", outcome: "gain", amount: 3000, result: "She stayed for the bigger role, and a second trained worker could share her responsibilities." },
      { text: "Let her go and hire someone new", outcome: "neutral", amount: -400, result: "Hiring cost RM 3,000 and the new worker needed two months to learn the job." }
    ],
    lesson: "Pay matters, and people also value a chance to learn and take on more responsibility.",
    hint: {
      en: "What does the worker value besides pay, and who could cover her job if she left?",
      zh: "除了薪水，她还重视什么？她离开后谁能接手？",
      ko: "그 직원에게 월급 말고 중요한 것은 무엇이며, 떠나면 누가 일을 맡을 수 있나요？"
    }
  },
  {
    id: 39, role: "operations", title: "The Faulty Batch",
    text: "{name}, four of the 1,500 people who bought one batch of {product} say a part is faulty. Nobody has been hurt so far. Asking everyone to stop using the items and replacing them would cost about RM 9,000.",
    options: [
      { text: "Replace items only for people who ask", outcome: "neutral", amount: -300, result: "You spent little, but some customers kept using faulty items because they hadn't been warned." },
      { text: "Wait for more evidence before doing anything", outcome: "loss", amount: -9000, result: "Another customer was hurt, and legal costs and refunds cost more than replacing the batch would have." },
      { text: "Ask everyone to stop using the batch and offer free replacements", outcome: "gain", amount: 3000, result: "The replacements cost money, but being open about the fault won back trust and helped sales recover." }
    ],
    lesson: "A recall asks people to stop using a faulty product so it can be repaired, returned or replaced.",
    hint: {
      en: "What would it cost if someone were hurt while using a faulty item?",
      zh: "如果有人用坏掉的商品受伤，后果会怎样？",
      ko: "불량 제품 때문에 누군가 다치면 어떤 비용이나 피해가 생길까요？"
    }
  },
  {
    id: 40, role: "tech", title: "A Machine to Pack Orders",
    text: "{name}, a RM 45,000 machine can do the work of three of your ten packers and save about RM 7,500 a month. Staff worry about losing jobs, and nobody knows how to look after the machine.",
    options: [
      { text: "Start using the machine slowly and train two packers for new jobs", outcome: "gain", amount: 5000, result: "Trained workers kept the machine running and helped customers, and the machine paid for itself within a year." },
      { text: "Use the machine only at busy times and keep everyone's job", outcome: "neutral", amount: 300, result: "You spent less on extra hours, but the machine sat unused for much of the year." },
      { text: "Use the machine right away and cut three jobs", outcome: "loss", amount: -6500, result: "Skilled workers left, and nobody could fix early problems with the machine." }
    ],
    lesson: "Automation saves work by using machines, but people still need to learn how to run them.",
    hint: {
      en: "Who would keep the machine running, and what jobs would still need people?",
      zh: "谁来维护机器？还有哪些工作需要人做？",
      ko: "누가 기계를 관리하고, 어떤 일은 여전히 사람이 해야 할까요？"
    }
  },
  {
    id: 41, role: "sales", title: "Selling in Another Country",
    text: "{name}, you're thinking of selling abroad. Shipping to Singapore takes two days and a trusted seller there would keep 20% of each sale. Thailand needs translation and has different rules. Indonesia has many more people, but border checks delay orders by about three weeks.",
    options: [
      { text: "Start across Indonesia with one large local seller", outcome: "loss", amount: -7500, result: "Delays tied up stock, local rules raised costs and your partner set the prices." },
      { text: "Test Thailand with a translated site and online orders", outcome: "neutral", amount: 200, result: "You learned about the market, but the few orders barely paid for the work." },
      { text: "Use the trusted seller in Singapore for a 20% cut", outcome: "gain", amount: 7000, result: "Fast shipping and a trusted seller brought in orders at less cost than setting up on your own." }
    ],
    lesson: "When you sell abroad, count the cost of shipping, local rules and any fees as well as the possible sales.",
    hint: {
      en: "How quickly could each plan get your product to a paying customer?",
      zh: "每种方案能多快把商品送到付钱的顾客手上？",
      ko: "각 방법으로 돈을 내는 고객에게 얼마나 빨리 물건을 보낼 수 있을까요？"
    }
  },
  {
    id: 42, role: "team", title: "A Second Shop",
    text: "The busy mall costs RM 9,000 a month and has 40,000 visitors a week. A site outside town costs RM 2,500 and has 3,000 visitors a week. You expect 2 in 100 visitors to buy, leaving RM 6 per sale before rent.",
    options: [
      { text: "Wait a year and open the first shop for longer", outcome: "neutral", amount: 0, result: "Longer hours brought in some extra sales, but the business grew only a little." },
      { text: "Open at the busy mall", outcome: "gain", amount: 9000, result: "About 3,400 sales a month easily covered the rent, which took 1,500 sales to pay." },
      { text: "Open outside town to keep rent low", outcome: "loss", amount: -6500, result: "About 260 sales a month fell short of the roughly 420 needed to pay the rent." }
    ],
    lesson: "When comparing shops, work out how many sales will cover the rent at each one.",
    hint: {
      en: "Divide the rent by RM 6 to find how many sales each place needs in a month.",
      zh: "用每处的月租除以 RM 6，算出一个月要卖多少单。",
      ko: "각 자리의 한 달 임대료를 RM 6으로 나눠 필요한 판매 건수를 계산해 보세요."
    }
  },
  {
    id: 43, role: "ceo", title: "Work From Home or the Office?",
    text: "The team wants to work from home most days. In a one-week test, each person got 12% more done. Only two of your 14 workers meet customers in person, and the office costs RM 6,000 a month.",
    options: [
      { text: "Keep everyone in the office five days a week", outcome: "loss", amount: -4500, result: "Two strong workers left for jobs that let them work from home, and replacing them was expensive." },
      { text: "Let people work from home when it suits their job and use the office for meetings", outcome: "gain", amount: 4000, result: "The team kept getting more done, and a smaller office saved the business money." },
      { text: "Set three office days and two home days for everyone", outcome: "neutral", amount: -200, result: "Some workers liked the plan, but little changed in how much the team got done or how much you spent." }
    ],
    lesson: "A work plan can use what you know about how people work and what customers need.",
    hint: {
      en: "Which tasks need people in the same place, and what did the test tell you about the others?",
      zh: "哪些工作需要大家在同一个地方？试行结果说明了什么？",
      ko: "어떤 일은 같은 장소에서 해야 하고, 나머지 일은 시험 결과가 무엇을 말해 주나요？"
    }
  },
  {
    id: 44, role: "finance", title: "Costs Are Going Up",
    text: "{name}, your costs have risen 9%. Before the rise, you kept 15% of each sale as profit. A survey says most buyers would accept prices up to 5% higher, but a bigger rise could send some to rivals.",
    options: [
      { text: "Keep prices the same and pay the higher costs yourself", outcome: "loss", amount: -4500, result: "Customers stayed, but you kept much less from each sale because costs went up." },
      { text: "Raise prices by 5% and remind buyers what makes your product good", outcome: "gain", amount: 4500, result: "Few buyers left, so a higher price helped cover much of the extra cost." },
      { text: "Raise prices by the full 9%", outcome: "neutral", amount: -200, result: "Enough shoppers left that the extra money per sale barely made up for fewer sales." }
    ],
    lesson: "A price rise can help cover costs, but it may change how much customers buy.",
    hint: {
      en: "Where did customers say they would start buying less, and what does that tell you?",
      zh: "顾客说涨到多少之后会少买？这给你什么线索？",
      ko: "고객은 얼마까지는 계속 산다고 했고, 그 말은 무엇을 알려 주나요？"
    }
  },
  {
    id: 45, role: "marketing", title: "Rewards for Regular Buyers",
    text: "{name}, you want customers to come back. About 30% of each sale is left after paying for the product. You could give frequent shoppers a free item, let people earn points or send discount codes.",
    options: [
      { text: "Email discount codes to past shoppers from time to time", outcome: "neutral", amount: 300, result: "Some shoppers came back, but the codes did little to get them to return regularly." },
      { text: "Give everyone their fifth item for free", outcome: "loss", amount: -5500, result: "The free items used up much of the money from sales, often rewarding people who would have bought anyway." },
      { text: "Offer points for quiet weekdays and extra rewards for regular shoppers", outcome: "gain", amount: 4000, result: "The rewards brought in weekday sales and cost less than the extra business earned." }
    ],
    lesson: "A reward works best if it brings in extra sales worth more than the reward costs.",
    hint: {
      en: "Would each reward change when or how often people shop?",
      zh: "每种奖励会改变顾客购物的时间或次数吗？",
      ko: "각 보상은 고객이 언제 또는 얼마나 자주 쇼핑하는지 바꿀까요？"
    }
  },
  {
    id: 46, role: "operations", title: "New Rules for Plastic Packaging",
    text: "{name}, packaging that breaks down naturally costs RM 1,800 more per month. A ban on throwaway plastic starts in eight months, and your supplier expects greener packs to get cheaper then. Many customers care, but only one in five would pay more.",
    options: [
      { text: "Switch now and raise prices by 10%", outcome: "loss", amount: -4000, result: "Most buyers wouldn't pay the higher price, so they bought less or switched to rivals." },
      { text: "Switch now, keep prices steady and tell customers", outcome: "neutral", amount: -300, result: "Some new buyers came in, but higher packing costs used up most of that gain." },
      { text: "Test a small order now and switch fully by the time the ban starts", outcome: "gain", amount: 3000, result: "The test let you find a pack that worked without paying the higher price for all your orders for months." }
    ],
    lesson: "Test a change early if it gives you time to fix problems before a deadline.",
    hint: {
      en: "What could you learn from a small test before you need to switch every order?",
      zh: "在所有订单都更换包装前，小规模试用能让你了解什么？",
      ko: "모든 주문의 포장을 바꾸기 전에 소량 시험으로 무엇을 배울 수 있을까요？"
    }
  },
  {
    id: 47, role: "hr", title: "Too Much Work in the Busy Season",
    text: "{name}, staff are working 55-hour weeks, and two are already off sick. The busy season ends in about six weeks. A new permanent worker costs RM 3,000 a month.",
    options: [
      { text: "Hire two permanent workers now", outcome: "loss", amount: -5000, result: "When demand went back to normal, you still had two extra salaries to pay." },
      { text: "Spend RM 6,000 on a one-time staff bonus", outcome: "neutral", amount: -300, result: "The team liked the bonus, but it didn't cut the long hours that had worn them out." },
      { text: "Hire help for six weeks and give staff time off afterwards", outcome: "gain", amount: 3000, result: "Short-term help covered the rush, and rest helped the team recover without adding year-round costs." }
    ],
    lesson: "Short-term help can cover a short rush without committing the business to permanent costs.",
    hint: {
      en: "What will the team need during the next six weeks, and what will change afterwards?",
      zh: "未来六周团队需要什么？六周过后又会有什么变化？",
      ko: "앞으로 6주 동안 팀에 무엇이 필요하고, 그 뒤에는 무엇이 바뀔까요？"
    }
  },
  {
    id: 48, role: "sales", title: "A Monthly Delivery Plan",
    text: "{name}, one order costs RM 15, and the average customer buys two or three times a month. You're considering regular deliveries for RM 49 a month. Most shoppers buy now and then, but around 200 buy regularly.",
    options: [
      { text: "Keep selling one order at a time", outcome: "neutral", amount: 0, result: "Sales stayed steady, but you missed a chance to earn regular monthly income." },
      { text: "Make the monthly plan the only way to buy", outcome: "loss", amount: -6000, result: "People who bought only now and then left, and sales fell before enough subscribers joined." },
      { text: "Offer regulars 10% off the monthly plan and let them cancel at any time", outcome: "gain", amount: 4000, result: "Regular shoppers signed up, giving you steadier income while others could still buy one order at a time." }
    ],
    lesson: "A subscription is a plan customers pay for regularly, such as once a month.",
    hint: {
      en: "Who might use enough deliveries to want a monthly plan, and who might prefer to buy only when they need it?",
      zh: "谁买得够多，会想订月度方案？谁更想有需要时再买？",
      ko: "누가 월간 배송을 충분히 이용하고, 누가 필요할 때만 사고 싶을까요？"
    }
  },
  {
    id: 49, role: "tech", title: "AI Replies to Customers",
    text: "{name}, an AI writing tool costs RM 800 a month and could help answer about 70% of your 400 monthly emails. In tests, it sometimes sounded sure while giving customers wrong information about refunds.",
    options: [
      { text: "Use AI to draft replies and have staff check them", outcome: "gain", amount: 3500, result: "Staff caught mistakes before replies went out, and customers heard back faster." },
      { text: "Let AI answer every email on its own", outcome: "loss", amount: -5500, result: "It promised refunds you hadn't agreed to, which cost money and drew complaints." },
      { text: "Use AI only for work that customers won't see", outcome: "neutral", amount: 200, result: "The tool saved a little time, but the team still had to answer every customer email from scratch." }
    ],
    lesson: "AI can save time on drafts, and a person needs to check important facts.",
    hint: {
      en: "Which mistakes could cost the business money if nobody checked the replies?",
      zh: "如果没人检查回复，哪些错误会让生意赔钱？",
      ko: "아무도 답장을 확인하지 않으면 어떤 실수가 사업에 돈을 잃게 할까요？"
    }
  },
  {
    id: 50, role: "team", title: "Sales Drop for Part of the Year",
    text: "Most of your sales come in just four months. During the other eight, staff and equipment sit idle part of the time. A related product sells best when your usual product is quiet. It would cost RM 20,000 to launch.",
    options: [
      { text: "Spend RM 20,000 advertising your usual product in slow months", outcome: "loss", amount: -5000, result: "Few people wanted the usual product at that time of year, so the ads brought in little extra money." },
      { text: "Spend RM 20,000 launching the product that sells in your quiet months", outcome: "gain", amount: 9500, result: "The new product brought in sales in slow months and gave workers and equipment more to do all year." },
      { text: "Cut costs in quiet months and wait for sales to pick up", outcome: "neutral", amount: -200, result: "You saved some money, but you lost staff and some customers while you waited." }
    ],
    lesson: "Selling products that are popular at different times can make income steadier across the year.",
    hint: {
      en: "What could keep the team and equipment busy when customers buy less of your usual product?",
      zh: "原来的商品卖得少时，什么能让员工和设备有活干？",
      ko: "평소 상품이 덜 팔릴 때 직원과 장비가 계속 일하려면 무엇을 할 수 있을까요？"
    }
  }
]);
