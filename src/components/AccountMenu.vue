<!-- <template>
  <div class="account-menu">
    <div class="account-menu-trigger" @click="toggleMenu">
      <div class="account-avatar">
        <span class="material-symbols-outlined">account_circle</span>
      </div>
      <div class="account-info">
        <div class="account-name">{{ userName }}</div>
        <div class="account-email">{{ userEmail }}</div>
      </div>
      <span class="material-symbols-outlined">{{ isOpen ? 'expand_less' : 'expand_more' }}</span>
    </div>

    <div v-if="isOpen" class="account-menu-dropdown">
      <a href="/profile" class="account-menu-item">
        <span class="material-symbols-outlined">person</span>
        Mon profil
      </a>
      <a href="/settings" class="account-menu-item">
        <span class="material-symbols-outlined">settings</span>
        Paramètres
      </a>
      <hr />
      <a href="/logout" class="account-menu-item" @click.prevent="handleLogout">
        <span class="material-symbols-outlined">logout</span>
        Déconnexion
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// TODO: récupérer depuis store/contexte utilisateur
const userName = ref('Utilisateur')
const userEmail = ref('user@example.com')
const isOpen = ref(false)

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function handleLogout() {
  // TODO: implémenter la déconnexion
  console.log('Logout')
  router.push('/connexion_lmnp')
}
</script>

<style scoped lang="scss">
.account-menu {
  position: relative;
  margin-top: 1rem;
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
}

.account-menu-trigger {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.account-avatar {
  .material-symbols-outlined {
    font-size: 2.5rem;
    color: #666;
  }
}

.account-info {
  flex: 1;
}

.account-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
}

.account-email {
  font-size: 0.75rem;
  color: #666;
}

.account-menu-dropdown {
  position: absolute;
  bottom: 100%;
  left: 1rem;
  right: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.account-menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .material-symbols-outlined {
    font-size: 1.25rem;
    color: #666;
  }
}

hr {
  margin: 0;
  border: none;
  border-top: 1px solid #e0e0e0;
}
</style> -->
