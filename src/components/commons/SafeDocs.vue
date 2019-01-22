<template>
  <div class="safeDocs">
    <div class="docsText">
      <img src="~@/assets/images/production/close@2x.png" class="close" alt="" @click="close">
      <div class="img">
        <img src="~@/assets/images/production/guohui@2x.png" alt="">
      </div>
      <h3 class="top">什么是存款保险？</h3>
      <p>存款保险又称存款保障，是指国家通过立法的形式，设立专门的存款保险基金，明确当个别金融机构经营出现问题时，依照规定对存款人进行及时偿付，保障存款人权益。</p>
      <h3>我国的存款保险何时开始施行？</h3>
      <p>国务院于2015年2月17日发布《存款保险条例》，自2015年5月1日起施行。</p>
      <h3>偿付限额是多少？ </h3>
      <p>根据《存款保险条例》，最高偿付限额为人民币50万元。 </p>
      <h3>什么情况下进行偿付？</h3>
      <p>根据《存款保险条例》，当出现下列情形时，存款人有权要求存款保险基金管理机构使用存款保险基金偿付存款人的被保险存款：</p>
      <p>- 存款保险基金管理机构担任投保机构的接管组织；</p>
      <p>- 存款保险基金管理机构实施被撤销投保机构的清算；</p>
      <p>- 人民法院裁定受理对投保机构的破产申请；</p>
      <p>- 经国务院批准的其他情形。 存款保险基金管理机构应当依照条例的规定，在前款规定情形发生之日起7个工作日内足额偿付存款。 存款保险基金怎么管理？</p>
      <p>存款保险基金由中国人民银行设立专门账户，分账管理，单独核算，管理工作由中国人民银行承担。</p>
      <h3>存款人需要缴纳保费吗？</h3>
      <p>不需要。存款保险作为国家金融安全网的一部分，其资金来源主要是金融机构按规定缴纳的保费。</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SafeDocs",
    methods: {
      close() {
        this.$emit('closeHandle')
      }
    }
  }
</script>

<style scoped lang="scss">


  .safeDocs {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #9e9e9e;
    z-index: 100;
    box-sizing: border-box;
    padding-top: px2rem(100);

    .docsText {
      position: relative;
      overflow-y: auto;
      padding: 0 px2rem(20) px2rem(20);
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: px2rem(20) px2rem(20) 0 0;
      background: #fff;
      line-height: px2rem(20);
      font-size: px2rem(14);

      .close {
        position: absolute;
        top: px2rem(10);
        right: px2rem(10);
        width: px2rem(14);

      }

      .top {
        margin-top: 0;
      }

      .img {
        margin: px2rem(20) 0;
        text-align: center;

        img {
          width: px2rem(50);
        }
      }

      h3 {
        color: #333;
        font-weight: 600;
        margin-top: px2rem(30);
      }

      p {
        color: #49546C;
        font-weight: 400;
      }
    }
  }

</style>
