<template>
  <div class="price-table-wrap">
    <table class="price-table">
      <caption class="price-table__caption">{{ caption }}</caption>
      <thead>
        <tr>
          <th scope="col">Bostad</th>
          <th scope="col">Pris efter RUT-avdrag</th>
          <th scope="col">Pris utan RUT-avdrag</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in visibleRows" :key="row.id">
          <th scope="row">{{ formatLabel(row.label) }}</th>
          <td class="price-table__price">{{ formatRange(row.min, row.max) }}</td>
          <td>{{ formatRange(priceWithoutRut(row.min), priceWithoutRut(row.max)) }}</td>
        </tr>
      </tbody>
    </table>
    <p class="price-table__note">
      Alla priser inklusive moms. RUT-avdraget är halva priset och dras direkt på fakturan.
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { formatLabel, formatRange, getPriceRow, priceRows, priceWithoutRut } from 'src/data/prices';

type PriceRowId = (typeof priceRows)[number]['id'];

export default defineComponent({
  name: 'PriceTable',
  props: {
    /** Row ids to show, in order. Defaults to every row. */
    rows: {
      type: Array as PropType<PriceRowId[]>,
      default: () => [],
    },
    caption: {
      type: String,
      default: 'Pris för fönsterputs i Stockholm med och utan RUT-avdrag',
    },
  },
  setup(props) {
    const visibleRows = computed(() =>
      props.rows.length
        ? props.rows.map((id) => getPriceRow(id)).filter((row): row is NonNullable<typeof row> => !!row)
        : priceRows,
    );

    return { visibleRows, formatLabel, formatRange, priceWithoutRut };
  },
});
</script>

<style scoped>
.price-table-wrap {
  width: 100%;
  overflow-x: auto;
  margin-top: 1.25rem;
}

.price-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.price-table th,
.price-table td {
  padding: 0.7rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(69, 90, 100, 0.16);
}

.price-table thead th {
  font-weight: 700;
  white-space: nowrap;
  border-bottom-color: rgba(69, 90, 100, 0.32);
}

.price-table tbody th {
  font-weight: 600;
}

.price-table__price {
  font-weight: 700;
  white-space: nowrap;
}

.price-table tbody tr:nth-child(even) th,
.price-table tbody tr:nth-child(even) td {
  background: rgba(69, 90, 100, 0.04);
}

.price-table__caption {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.price-table__note {
  margin: 0.75rem 0 0;
  font-size: 0.85rem;
  opacity: 0.8;
}

@media (max-width: 599px) {
  .price-table th,
  .price-table td {
    padding: 0.6rem 0.45rem;
    font-size: 0.86rem;
  }

  .price-table thead th {
    white-space: normal;
  }
}
</style>
