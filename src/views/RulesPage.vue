<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const temporaryDeferrals = [
  {factor: 'Blood transfusion', period: '6 months'},
  {factor: 'Surgery (including abortion)', period: '6 months'},
  {factor: 'Tattoo / piercing / acupuncture', period: '6 months'},
  {factor: 'Foreign trip > 2 months', period: '6 months'},
  {factor: 'Stay in malaria-endemic region', period: '3 years'},
  {factor: 'Contact with hepatitis B/C', period: '6 months'},
  {factor: 'Tooth extraction', period: '10 days'},
  {factor: 'Antibiotics', period: '2 weeks after course'},
  {factor: 'Alcohol intake', period: '2 days'},
]
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round relative overflow-hidden">

    <div class="surface-0 border-round-xl shadow-1 mb-5 overflow-hidden">
      <div class="grid m-0">
        <div class="col-12 md:col-6 p-6 flex flex-column justify-content-center">
          <h1 class="text-3xl font-bold mb-3">
            Become a Blood Donor Today
          </h1>

          <div class="text-red-500 font-semibold mb-2">
            Safe. Voluntary. Life-saving.
          </div>

          <p class="line-height-3 m-0" style="max-width: 42rem;">
            Blood donation is a simple and safe process that can help save multiple lives.
            If you are between 18 and 60 years old and meet medical requirements,
            you can become a donor.
          </p>
        </div>

        <div class="col-12 md:col-6 p-0 relative hero-img-wrap">
          <img
            src="/images/blood_center_choose.jpg"
            alt=""
            class="w-full h-full"
            style="
            object-fit: cover;
            object-position: 65% 30%;
            display: block;
          "
          />
        </div>
      </div>
    </div>

    <h2 class="text-xl font-bold mb-3">How do I become a donor?</h2>

    <div class="mb-4 line-height-3">
      A donor is an individual between the ages of 18 and 60 who has passed a medical
      examination, has no contraindications, and voluntarily agrees to donate blood.
    </div>

    <div class="mb-5">
      <ul class="line-height-3">
        <li>Present a valid passport or identification document.</li>
        <li>Provide truthful medical and epidemiological information.</li>
        <li>Undergo a medical examination before donation.</li>
      </ul>
    </div>

    <h2 class="text-xl font-bold mb-3">How to Prepare for Blood Donation</h2>

    <div class="grid mb-5">
      <div class="col-12 md:col-6">
        <div class="prep-card p-4 border-round-xl">
          <h3 class="font-semibold mb-3 text-red-500">Before Donation</h3>
          <ul class="text-sm line-height-3">
            <li>Do not donate if you feel unwell.</li>
            <li>No alcohol 48 hours before donation.</li>
            <li>Stop analgesics 3 days before donation.</li>
            <li>Avoid fatty, fried, spicy foods.</li>
            <li>Get enough sleep and eat a light breakfast.</li>
          </ul>
        </div>
      </div>

      <div class="col-12 md:col-6">
        <div class="prep-card p-4 border-round-xl">
          <h3 class="font-semibold mb-3 text-primary">After Donation</h3>
          <ul class="text-sm line-height-3">
            <li>Rest for 10–15 minutes.</li>
            <li>Avoid heavy physical activity.</li>
            <li>Drink at least 2 liters of liquid.</li>
            <li>Do not remove bandage for 3–4 hours.</li>
          </ul>
        </div>
      </div>
    </div>

    <h2 class="text-xl font-bold mb-3">Permanent Contraindications</h2>

    <div class="mb-4 line-height-3">
      HIV infection, viral hepatitis B and C, syphilis, tuberculosis,
      malignant neoplasms, severe cardiovascular diseases, drug addiction,
      alcoholism, severe endocrine disorders, and others.
    </div>

    <h2 class="text-xl font-bold mb-3">Temporary Deferrals</h2>

    <DataTable
      :value="temporaryDeferrals"
      size="small"
      stripedRows
      class="border-round-xl"
    >
      <Column field="factor" header="Condition / Factor"/>
      <Column field="period" header="Deferral Period"/>
    </DataTable>

  </div>
</template>

<style scoped>
.prep-card {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(3px);
}

.hero-img-wrap {
  min-height: 260px;
  max-height: 320px;
  background: linear-gradient(135deg, rgba(255,0,0,0.06), rgba(255,255,255,0));
}

.hero-img-wrap img {
  height: 100%;
  object-fit: cover;
  object-position: 65% 20%;

  -webkit-mask-image: linear-gradient(
    to left,
    rgba(0,0,0,1) 70%,
    rgba(0,0,0,0.6) 85%,
    rgba(0,0,0,0) 100%
  );
  mask-image: linear-gradient(
    to left,
    rgba(0,0,0,1) 70%,
    rgba(0,0,0,0.6) 85%,
    rgba(0,0,0,0) 100%
  );
}

@media (min-width: 768px) {
  .hero-img-wrap {
    min-height: 300px;
  }
}
</style>
