<template>
  <div class="terms">
    <div class="body">
      <h2>Terms And Conditions</h2>
      <p>
        By downloading or using the app, these terms will automatically apply to
        you – you should make sure therefore that you read them carefully before
        using the app. You’re not allowed to copy, or modify the app, any part
        of the app, or our trademarks in any way. You’re not allowed to attempt
        to extract the source code of the app, and you also shouldn’t try to
        translate the app into other languages, or make derivative versions. The
        app itself, and all the trade marks, copyright, database rights and
        other intellectual property rights related to it, still belong to Lei
        Lu.
      </p>
      <p>
        {{ appName }} is committed to ensuring that the app is as useful and
        efficient as possible. For that reason, we reserve the right to make
        changes to the app or to charge for its services, at any time and for
        any reason. We will never charge you for the app or its services without
        making it very clear to you exactly what you’re paying for. The
        {{ appName }} app stores and processes personal data that you have
        provided to us, in order to provide my Service. It’s your responsibility
        to keep your phone and access to the app secure. We therefore recommend
        that you do not jailbreak or root your phone, which is the process of
        removing software restrictions and limitations imposed by the official
        operating system of your device. It could make your phone vulnerable to
        malware/viruses/malicious programs, compromise your phone’s security
        features and it could mean that the rain-CRM app won’t work properly or
        at all.
      </p>
      <p>
        The app does use third party services that declare their own Terms and
        Conditions. Link to Terms and Conditions of third party service
        providers used by the app
      </p>
      <p>1.Google Contacts</p>
      <p>2.Google Gmail</p>
      <p>3.Google Map</p>
      <p>
        You should be aware that there are certain things that {{ appNme }} will
        not take responsibility for. Certain functions of the app will require
        the app to have an active internet connection. The connection can be
        Wi-Fi, or provided by your mobile network provider, but
        {{ appNme }} cannot take responsibility for the app not working at full
        functionality if you don’t have access to Wi-Fi, and you don’t have any
        of your data allowance left.
      </p>
      <p>
        If you’re using the app outside of an area with Wi-Fi, you should
        remember that your terms of the agreement with your mobile network
        provider will still apply. As a result, you may be charged by your
        mobile provider for the cost of data for the duration of the connection
        while accessing the app, or other third party charges. In using the app,
        you’re accepting responsibility for any such charges, including roaming
        data charges if you use the app outside of your home territory (i.e.
        region or country) without turning off data roaming. If you are not the
        bill payer for the device on which you’re using the app, please be aware
        that we assume that you have received permission from the bill payer for
        using the app.
      </p>
      <p>
        Along the same lines, {{ appName }} cannot always take responsibility
        for the way you use the app i.e. You need to make sure that your device
        stays charged – if it runs out of battery and you can’t turn it on to
        avail the Service, {{ appName }} cannot accept responsibility.
      </p>
      <h3>Changes to This Terms and Conditions</h3>
      <p>
        I may update our Terms and Conditions from time to time. Thus, you are
        advised to review this page periodically for any changes. I will notify
        you of any changes by posting the new Terms and Conditions on this page.
      </p>
      <h3>Contact Us</h3>
      <p>
        If you have any questions or suggestions about my Terms and Conditions,
        do not hesitate to contact me at {{email}}.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Terms extends Vue {
  private appName = "rain-CRM";
  private webSite = "https://www.thefarmingcrm.com/";
  private email = "teamrainmaker.nz@gmail.com";
}
</script>

<style scoped>
.terms {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding: 1em;
}
.body {
  margin-left: 20%;
  margin-right: 20%;
  background-color: aliceblue;
}
p,
h3,
h4 {
  text-align: left;
  margin: 1rem;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
