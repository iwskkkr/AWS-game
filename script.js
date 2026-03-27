const floatingWindow = document.getElementById('floating-window');
const floatingTitle = document.getElementById('floating-title');
const floatingBody = document.getElementById('floating-body');

const modalOverlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');

function foundHole(type) {
    let content = '';

    modalBody.innerHTML = content;
    modalOverlay.classList.remove('hidden');
}

function closeModal() {
    modalOverlay.classList.add('hidden');
}

/* =========================
   各リソースの説明
========================= */
const details = {
    'ユーザー': {
        title: 'ユーザー',
        description: 'ユーザー: サービスを利用するエンドユーザー。',
        settings: ''
    },
    '開発者': {
        title: '開発者',
        description: '開発者: システム構成を構築・管理するユーザー。',
        settings: ''
    },
    'IGW': {
        title: 'Internet Gateway',
        description: 'Internet Gateway: VPCとインターネット間の通信を可能にするゲートウェイ。',
        settings: '設定例<br>・VPC ID: vpc-12345<br>・State: attached'
    },
    'NAT-GW': {
        title: 'NAT Gateway',
        description: 'NAT ゲートウェイは、プライベートサブネットから外部への通信を可能にします。',
        settings: 'Subnet: Public Subnet<br>・Elastic IP: x.x.x.x'
    },
    'IAMロール': {
        title: 'IAMロール',
        description: 'IAMロール: AWSリソースへのアクセス権限を管理。',
        settings: `
        設定例<br>
        ・Role Name: EC2Role<br>
        ・Policies: 
        <span class="vuln" onclick="foundHole('iam-overprivilege')">AmazonS3FullAccess</span>
        `
    },
    'S3': {
        title: 'S3',
        description: 'S3: オブジェクトストレージ。',
        settings: `
        設定例<br>
        ・Bucket Name: my-bucket<br>
        ・Public Access: 
        <span class="vuln" onclick="foundHole('s3-public')">ON</span>
        `
    },
    'EC2-公開': {
        title: 'EC2 (Public)',
        description: '仮想サーバ。',
        settings: `
        <hr>
        <strong>AMI</strong><br>
        RedHat Enterprise 9.5
        <hr>
        <strong>セキュリティグループ</strong><br>
        インバウンドルール: 
        <span class="vuln" onclick="foundHole('ec2-sg')">0.0.0.0/0</span><br>
        アウトバウンドルール: 0.0.0.0/0
        <hr>
        <strong>インスタンスタイプ</strong><br>
        t3.micro
        `
    },
    'EC2-非公開': {
        title: 'EC2 (Private)',
        description: '内部用EC2。',
        settings: '設定例<br>・AMI: Amazon Linux 2'
    },
    'RDS': {
        title: 'RDS',
        description: 'マネージドDB。',
        settings: '設定例<br>・Engine: MySQL 8.0'
    }
};

/* =========================
   脆弱性データ
========================= */
const vulnerabilities = {
    'ec2-sg': {
        title: '🎯 セキュリティホール発見！！',
        content: `
        <p><strong>問題点：</strong><br>
        インバウンドルールが <b>0.0.0.0/0</b></p>

        <p><strong>なぜ危険？：</strong><br>
        全世界からアクセス可能</p>

        <p><strong>対策：</strong><br>
        IP制限をかける</p>
        `
    },
    's3-public': {
        title: '🎯 セキュリティホール発見！！',
        content: `
        <p><strong>問題点：</strong><br>
        S3がパブリック公開</p>

        <p><strong>なぜ危険？：</strong><br>
        誰でも閲覧可能</p>

        <p><strong>対策：</strong><br>
        Block Public Accessを有効化</p>
        `
    },
    'iam-overprivilege': {
        title: '🎯 セキュリティホール発見！！',
        content: `
        <p><strong>問題点：</strong><br>
        権限が強すぎる</p>

        <p><strong>なぜ危険？：</strong><br>
        被害拡大のリスク</p>

        <p><strong>対策：</strong><br>
        最小権限にする</p>
        `
    }
};

/* =========================
   フローティング表示
========================= */
function showFloatingWindow(resource, event) {
    const info = details[resource] || { title: resource, description: '', settings: '' };

    floatingTitle.textContent = info.title;

    let bodyHtml = `<p>${info.description}</p>`;
    if (info.settings) {
        bodyHtml += `<div>${info.settings}</div>`;
    }

    floatingBody.innerHTML = bodyHtml;
    floatingWindow.classList.remove('hidden');

    if (event) {
        const rect = event.target.getBoundingClientRect();
        floatingWindow.style.left = `${rect.left + window.scrollX + 70}px`;
        floatingWindow.style.top = `${rect.top + window.scrollY - 50}px`;
        floatingWindow.style.position = 'absolute';
    }
}

/* =========================
   脆弱性発見
========================= */
function foundHole(type) {
    const vuln = vulnerabilities[type];
    if (!vuln) return;

    document.querySelector('.modal-title').textContent = vuln.title;
    modalBody.innerHTML = vuln.content;

    modalOverlay.classList.remove('hidden');
}

/* =========================
   モーダル閉じる
========================= */
function closeModal() {
    modalOverlay.classList.add('hidden');
}

/* =========================
   外クリックで閉じる
========================= */
window.addEventListener('click', (event) => {
    if (
        !floatingWindow.classList.contains('hidden') &&
        !floatingWindow.contains(event.target) &&
        event.target.closest('img') == null
    ) {
        closeFloatingWindow();
    }

    if (event.target === modalOverlay) {
        closeModal();
    }
});

/* =========================
   フローティング閉じる
========================= */
function closeFloatingWindow() {
    floatingWindow.classList.add('hidden');
}