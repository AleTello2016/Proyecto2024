class Prodotto { // Class name changed to Prodotto (Product in Italian)
  constructor(nome, prezzo, anno) {
    this.nome = nome;
    this.prezzo = prezzo;
    this.anno = anno;
  }
}

class UI {
  aggiungiProdotto(prodotto) {
    const listaProdotti = document.getElementById('product-list');
    const elemento = document.createElement('div');
    elemento.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body">
          <strong>Nome Prodotto</strong>: ${prodotto.nome}
          <strong>Prezzo Prodotto</strong>: ${prodotto.prezzo}
          <strong>Anno Prodotto</strong>: ${prodotto.anno}
          <a href="#" class="btn btn-danger" name="elimina">Elimina</a>
        </div>
      </div>
    `;
    listaProdotti.appendChild(elemento);
  }

  pulisciForm() { // resetForm function renamed to pulisciForm (clear form)
    document.getElementById('product-form').reset();
  }

  eliminaProdotto(elemento) {
    if (elemento.name === 'elimina') {
      elemento.parentElement.parentElement.parentElement.remove();
      this.mostraMessaggio('Prodotto eliminato con successo', 'info');
    }
  }

  mostraMessaggio(messaggio, classeCSS) {
    const div = document.createElement('div');
    div.className = `alert alert-${classeCSS} mt-2`;
    div.appendChild(document.createTextNode(messaggio));
    // Showing in DOM
    const contenitore = document.querySelector('.container');
    const app = document.querySelector('#App');
    contenitore.insertBefore(div, app);
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }
}

// Eventi DOM
document.getElementById('product-form').addEventListener('submit', function (e) {
  const nome = document.getElementById('name').value;
  const prezzo = document.getElementById('price').value;
  const anno = document.getElementById('year').value;

  const prodotto = new Prodotto(nome, prezzo, anno);

  const ui = new UI();

  if (nome === '' || prezzo === '' || anno === '') {
    return ui.mostraMessaggio('Completa tutti i campi', 'danger');
  }

  ui.aggiungiProdotto(prodotto);
  ui.pulisciForm();
  ui.mostraMessaggio('Prodotto aggiunto con successo', 'success');

  e.preventDefault();
});

document.getElementById('product-list').addEventListener('click', function(e) {
  const ui = new UI();

  ui.eliminaProdotto(e.target);
});
