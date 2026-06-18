import { useMemo, useState } from 'react';

import './styles/App.css';
import './styles/reset.css';

import { makeCordel } from './api/api';

const initialForm = {
  tema: '',
  personagem: '',
  cenario: '',
  tom: 'bem-humorado',
  tamanho: '6 estrofes',
  publico: 'geral',
  detalhe: '',
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [cordel, setCordel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const previewTitle = useMemo(() => {
    return form.tema ? `Cordel sobre ${form.tema}` : 'Seu cordel aparecerá aqui';
  }, [form.tema]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setCordel('');

    try {
      const response = await makeCordel(form);
      setCordel(response.data);
    } catch (requestError) {
      setError('Não consegui criar o cordel agora. Confira o servidor e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setForm(initialForm);
    setCordel('');
    setError('');
  }

  return (
    <div className="App">
      <aside className="sidebar">
        <div className="brand-mark">CC</div>
        <div>
          <h1>Cordel Creator</h1>
          <p>Crie folhetos rimados com sabor de feira, memória e verso popular.</p>
        </div>
      </aside>

      <main className="workspace">
        <section className="form-panel" aria-labelledby="creator-title">
          <div className="section-heading">
            <span>Oficina</span>
            <h2 id="creator-title">Novo cordel</h2>
          </div>

          <form onSubmit={handleSubmit} className="cordel-form">
            <label>
              Tema
              <input
                name="tema"
                value={form.tema}
                onChange={updateField}
                placeholder="Ex.: a chegada da chuva no sertão"
                required
              />
            </label>

            <div className="field-grid">
              <label>
                Personagem
                <input
                  name="personagem"
                  value={form.personagem}
                  onChange={updateField}
                  placeholder="Ex.: Dona Severina"
                />
              </label>

              <label>
                Cenário
                <input
                  name="cenario"
                  value={form.cenario}
                  onChange={updateField}
                  placeholder="Ex.: feira de Caruaru"
                />
              </label>
            </div>

            <div className="field-grid">
              <label>
                Tom
                <select name="tom" value={form.tom} onChange={updateField}>
                  <option value="bem-humorado">Bem-humorado</option>
                  <option value="emocionante">Emocionante</option>
                  <option value="aventuresco">Aventuresco</option>
                  <option value="critico">Crítico</option>
                  <option value="infantil">Infantil</option>
                </select>
              </label>

              <label>
                Tamanho
                <select name="tamanho" value={form.tamanho} onChange={updateField}>
                  <option value="4 estrofes">4 estrofes</option>
                  <option value="6 estrofes">6 estrofes</option>
                  <option value="8 estrofes">8 estrofes</option>
                  <option value="10 estrofes">10 estrofes</option>
                </select>
              </label>
            </div>

            <label>
              Público
              <input
                name="publico"
                value={form.publico}
                onChange={updateField}
                placeholder="Ex.: crianças, turistas, escola"
              />
            </label>

            <label>
              Detalhes
              <textarea
                name="detalhe"
                value={form.detalhe}
                onChange={updateField}
                placeholder="Inclua acontecimentos, objetos ou uma moral para fechar a história."
                rows="5"
              />
            </label>

            {error && <p className="error-message">{error}</p>}

            <div className="actions">
              <button type="submit" disabled={loading}>
                {loading ? 'Criando...' : 'Criar cordel'}
              </button>
              <button type="button" className="ghost-button" onClick={handleClear}>
                Limpar
              </button>
            </div>
          </form>
        </section>

        <section className="result-panel" aria-live="polite">
          <div className="woodcut-strip" aria-hidden="true" />
          <div className="section-heading">
            <span>Folheto</span>
            <h2>{previewTitle}</h2>
          </div>
          <article className="cordel-output">
            {loading ? (
              <div className="loading-state" role="status" aria-label="Criando cordel">
                <span className="spinner" aria-hidden="true" />
                <p>Criando cordel...</p>
              </div>
            ) : cordel ? (
              cordel.split('\n').map((line, index) => (
                <p key={`${line}-${index}`}>{line || '\u00A0'}</p>
              ))
            ) : (
              <p className="placeholder">
                Preencha o tema e aperte criar para receber uma história em sextilhas rimadas.
              </p>
            )}
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
