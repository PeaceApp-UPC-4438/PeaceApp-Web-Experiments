<script>
import { UserApiService } from "@/services/userapi.service.js";
import { useRoute } from 'vue-router';
import CitizenToolbar from "@/components/toolbar/toolbarCitizen.component.vue";
import { CommentApiService } from "@/services/commentapi.service.js";
import { ReportApiService } from "@/services/reportapi.service.js";

export default {
  name: 'ReportComments',
  components: { CitizenToolbar },
  data() {
    return {
      comments: [],
      report: null,
      isLoading: true,
      error: null,
      route: useRoute(),
      userService: new UserApiService(),
      userName: '',
      userLastname: '',
      newComment: '',
      commentToDelete: null,
      commentToEdit: null,
      editedCommentContent: ''
    };
  },
  mounted() {
    this.fetchReportAndComments();
  },
  methods: {
    confirmDelete(comment) {
      this.commentToDelete = comment;
    },
    cancelDelete() {
      this.commentToDelete = null;
    },
    async deleteComment() {
      if (!this.commentToDelete) return;
      try {
        await new CommentApiService().deleteComment(this.commentToDelete.id);
        this.commentToDelete = null;
        this.fetchReportAndComments();
      } catch (err) {
        this.error = 'No se pudo eliminar el comentario.';
        this.commentToDelete = null;
      }
    },
    openEditModal(comment) {
      this.commentToEdit = { ...comment };
      this.editedCommentContent = comment.content;
    },
    cancelEdit() {
      this.commentToEdit = null;
      this.editedCommentContent = '';
    },
    async saveEditedComment() {
      console.log("➡️ Iniciando edición de comentario");

      if (!this.commentToEdit || !this.editedCommentContent.trim()) {
        console.warn("⚠️ Datos inválidos para editar:", this.commentToEdit, this.editedCommentContent);
        return;
      }

      try {
        const updatedComment = {
          ...this.commentToEdit,
          content: this.editedCommentContent
        };

        console.log("📦 Comentario a actualizar:", updatedComment);

        const response = await new CommentApiService().updateComment(this.commentToEdit.id, this.editedCommentContent);

        console.log("✅ Respuesta del servidor:", response);

        if (response.status === 200) {
          this.commentToEdit = null;
          this.editedCommentContent = '';
          await this.fetchReportAndComments();
        } else {
          console.error("❌ Error esperado, código no 200:", response.status, response.data);
        }
      } catch (err) {
        console.error("❌ Error en catch al editar comentario:", err);
        this.error = 'No se pudo editar el comentario.';
      }
    },
    translateType(type) {
      if (!type || typeof type !== 'string') return type;
      const normalized = type.toLowerCase();
      const types = {
        robo: this.$t('reportForm.placeholders.robbery'),
        robbery: this.$t('reportForm.placeholders.robbery'),
        accidente: this.$t('reportForm.placeholders.accident'),
        accident: this.$t('reportForm.placeholders.accident'),
        oscuro: this.$t('reportForm.placeholders.dark_area'),
        dark_area: this.$t('reportForm.placeholders.dark_area'),
        acoso: this.$t('reportForm.placeholders.harassment'),
        harassment: this.$t('reportForm.placeholders.harassment'),
        otro: this.$t('reportForm.placeholders.other'),
        other: this.$t('reportForm.placeholders.other')
      };
      return types[normalized] || type;
    },
    async fetchReportAndComments() {
      try {
        const reportId = this.route.params.reportId;
        const reportRes = await new ReportApiService().getById(reportId);
        this.report = reportRes.data;

        if (this.report.idUser) {
          const userRes = await this.userService.getUserById(this.report.idUser);
          if (userRes && userRes.status === 200 && userRes.data) {
            this.userName = userRes.data.name || '';
            this.userLastname = userRes.data.lastname || '';
          }
        }

        const commentRes = await new CommentApiService().getCommentsByReportId(reportId);
        const commentsWithUsers = await Promise.all(
            commentRes.data.map(async (comment) => {
              let fullName = 'Desconocido';
              try {
                const res = await this.userService.getUserById(comment.userId);
                if (res && res.data) {
                  fullName = `${res.data.name || ''} ${res.data.lastname || ''}`.trim();
                }
              } catch (_) {}
              return {
                ...comment,
                userFullName: fullName
              };
            })
        );
        this.comments = commentsWithUsers;

      } catch (err) {
        this.error = 'Error al cargar el reporte o los comentarios';
      } finally {
        this.isLoading = false;
      }
    },
    async submitComment() {
      if (!this.newComment.trim()) return;
      try {
        const reportId = this.report.id;
        const userId = this.report.idUser;
        const payload = {
          content: this.newComment,
          userId,
          reportId
        };
        await new CommentApiService().createComment(payload);
        this.newComment = '';
        this.fetchReportAndComments();
      } catch (err) {
        this.error = 'No se pudo enviar el comentario.';
      }
    }
  }
};
</script>

<template>
  <header>
    <CitizenToolbar />
  </header>

  <div class="container">
    <h1>{{ $t("reports.details") }}</h1>

    <div v-if="isLoading">Cargando...</div>
    <div v-if="error">{{ error }}</div>

    <div v-if="report" class="report-item">
      <h2>{{ report.title }}</h2>

      <p><strong>{{ $t('reports.realUser_label') }}</strong> {{ userName }} {{ userLastname }}</p>
      <p><strong>{{ $t('reports.type_label') }}</strong> {{ translateType(report.type) }}</p>
      <p><strong>{{ $t('reports.address_label') || 'Address:' }}</strong> {{ report.address }}</p>
      <p><strong>{{ $t('reports.description_label') }}</strong> {{ report.detail }}</p>
      <p>
        <strong>{{ $t('reports.user_label') }}</strong>
        <span v-if="report.citizenFullName">{{ report.citizenFullName }}</span>
        <span v-else>{{ new Date(report.createdAt).toLocaleDateString() }}</span>
      </p>
      <p v-if="report.image">
        <strong>{{ $t('reports.evidence_label') || 'Evidence:' }}</strong><br>
        <img :src="report.image" alt="Evidencia" class="evidence-img" />
      </p>
    </div>

    <h2 class="comments-title">{{ $t("comments.title") }}</h2>

    <div v-if="comments.length === 0">{{ $t("comments.none") }}</div>
    <div v-else class="comment-list">
      <div v-for="comment in comments" :key="comment.id" class="comment-card">
        <p class="content">{{ comment.content }}</p>
        <p class="meta">
          {{ $t('comments.user') }}: {{ comment.userFullName || $t('comments.unknown') }}<br />
          {{ $t('comments.date') }}:
          <span v-if="comment.updatedAt">
{{ new Date(comment.updatedAt).toLocaleString() }}
</span>
          <span v-else>
  {{ new Date(comment.creationDate).toLocaleString() }}
</span>

        </p>
        <div class="actions">
          <button class="edit-btn" @click="openEditModal(comment)">{{ $t("comments.edit") }}</button>
          <button class="delete-btn" @click="confirmDelete(comment)">{{ $t("comments.delete") }}</button>
        </div>
      </div>
    </div>
    <!-- MODAL DE EDICIÓN -->
    <div v-if="commentToEdit" class="modal-overlay">
      <div class="modal">
        <p>{{ $t("comments.edit_modal_title") }}</p>
        <textarea
            v-model="editedCommentContent"
            rows="4"
            style="width: 100%; margin-top: 1rem; resize: none; padding: 0.5rem;"
        ></textarea>
        <div class="modal-actions" style="margin-top: 1rem;">
          <button @click="saveEditedComment">{{ $t("comments.save") }}</button>
          <button @click="cancelEdit">{{ $t("comments.cancel") }}</button>
        </div>
      </div>
    </div>

    <!-- MODAL DE CONFIRMACIÓN -->
    <div v-if="commentToDelete" class="modal-overlay">
      <div class="modal">
        <p>{{ $t("comments.confirm_delete") }}</p>
        <div class="modal-actions">
          <button @click="deleteComment">{{ $t("comments.confirm_yes") }}</button>
          <button @click="cancelDelete">{{ $t("comments.cancel") }}</button>
        </div>
      </div>
    </div>

    <!-- NUEVO COMENTARIO -->
    <div class="new-comment">
<textarea
    v-model="newComment"
    :placeholder="$t('comments.placeholder')"
></textarea>
      <button @click="submitComment">{{ $t("comments.submit") }}</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: #1F79AA;
  padding: 100px 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}

.report-item {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 800px;
  width: 100%;
}

.report-item h2 {
  text-align: center;
  color: #01A1FF;
  margin-top: 0;
}
.comments-title {
  margin-top: 2rem;
  color: white;
}

body.dark .comments-title {
  color: #f5f5f5;
}

.report-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.evidence-img {
  max-width: 100%;
  margin-top: 1rem;
  border-radius: 8px;
}

body.dark .report-item p,
body.dark .report-item strong {
  color: #f5f5f5;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  width: 100%;
}

.comment-list:not(:empty) {
  margin-top: 1rem;
}

.comment-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f5faff;
}

.content {
  font-size: 1.1rem;
  color: #333;
}

.meta {
  font-size: 0.9rem;
  color: #666;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}


.actions button {
  padding: 0.3rem 0.8rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background-color: #007bff;
  color: white;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #339af0;
  color: white;
}

.delete-btn:hover {
  background-color: #1c7ed6;
}


/* Modo oscuro */
body.dark .container {
  background-color: #121212;
}

body.dark h1 {
  color: #f5f5f5;
}

body.dark .report-item {
  background-color: #1e1e1e;
  border-color: #333;
  box-shadow: 0 1px 6px rgba(255, 255, 255, 0.05);
}

body.dark .report-item:hover {
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
}

body.dark .report-item h2 {
  color: #4ea3ff;
}

body.dark .comment-card {
  background-color: #1a1a1a;
  border-color: #444;
}

body.dark .content {
  color: #ddd;
}

body.dark .meta {
  color: #aaa;
}

body.dark .edit-btn {
  background-color: #339af0;
}

body.dark .delete-btn {
  background-color: #1c7ed6;
}


/* NUEVO COMENTARIO */
.new-comment {
  max-width: 800px;
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.new-comment textarea {
  width: 100%;
  height: 120px;
  resize: none;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.new-comment button {
  align-self: flex-end;
  padding: 0.5rem 1.2rem;
  background-color: #01A1FF;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.new-comment button:hover {
  background-color: #0089d6;
}

body.dark .new-comment textarea {
  background-color: #1e1e1e;
  color: #eee;
  border-color: #555;
}

body.dark .new-comment button {
  background-color: #4ea3ff;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.modal-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.modal-actions button:first-child {
  background-color: #007bff;
  color: white;
}

.modal-actions button:last-child {
  background-color: #6c757d;
  color: white;
}

body.dark .modal {
  background-color: #1e1e1e;
  color: #fff;
}

body.dark .modal-actions button:last-child {
  background-color: #555;
}
@media (max-width: 768px) {
  .container {
    padding: 80px 1rem 2rem;
  }

  .report-item,
  .comment-card,
  .new-comment,
  .modal {
    width: 100%;
    max-width: 100%;
  }

  .actions {
    flex-direction: column;
    align-items: flex-end;
  }

  .actions button {
    width: 100%;
    margin-top: 0.3rem;
  }

  .modal-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .modal-actions button {
    width: 100%;
  }
}

</style>
